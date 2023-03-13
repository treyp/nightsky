const FRAGMENT_TYPE_ENTITY = "entity";
const FRAGMENT_TYPE_TEXT = "text";
const FRAGMENT_TYPE_LINE_BREAK = "line-break";

// Separate the text into an array of fragments which can be mapped to React fragments
function textFragments(text, entities) {
  let fragments = [];

  // A map of starting characters to entities
  const entitiesMap = {};
  if (entities) {
    entities.forEach((entity) => {
      if (!entity?.index?.start) {
        return;
      }
      entitiesMap[entity.index.start] = entity;
    });
  }

  let currentFragment = "";
  let nextFragment;
  let currentChar;
  let currentEntity = null;
  // Parse the string character-by-character looking for entities and line breaks
  for (let charIndex = 0; charIndex < text.length; charIndex++) {
    currentChar = text[charIndex];
    nextFragment = currentFragment + currentChar;

    // End of entity boundary found
    if (currentEntity && currentEntity.index.end === charIndex) {
      fragments.push({
        text: nextFragment,
        type: FRAGMENT_TYPE_ENTITY,
        entity: currentEntity,
      });
      nextFragment = "";
      currentEntity = null;
    }

    // Start of entity boundary found
    if (entitiesMap[charIndex]) {
      if (currentFragment.length) {
        if (currentEntity) {
          throw new Error("Unexpected overlapping text entities found");
        }
        fragments.push({ text: currentFragment, type: FRAGMENT_TYPE_TEXT });
        nextFragment = currentChar;
      }
      currentEntity = entitiesMap[charIndex];
      currentChar = text[charIndex];
      currentFragment = currentChar;
    }

    // Handle line breaks in text
    if (!currentEntity && currentChar === "\n") {
      if (currentFragment.length) {
        fragments.push({ text: currentFragment, type: FRAGMENT_TYPE_TEXT });
      }
      fragments.push({ type: FRAGMENT_TYPE_LINE_BREAK });
      nextFragment = "";
    }

    currentFragment = nextFragment;
  }

  // We've reached the end of the string
  if (currentFragment.length) {
    if (currentEntity) {
      fragments.push({
        text: currentFragment,
        type: FRAGMENT_TYPE_ENTITY,
        entity: currentEntity,
      });
    } else {
      fragments.push({ text: currentFragment, type: FRAGMENT_TYPE_TEXT });
    }
  }

  return fragments;
}

function mapFragmentsToComponents(textFragments) {
  return textFragments.map((fragment, fragmentIndex) => {
    if (fragment.type === FRAGMENT_TYPE_LINE_BREAK) {
      return <br key={fragmentIndex} />;
    }
    if (fragment.type === FRAGMENT_TYPE_ENTITY) {
      if (fragment.entity?.type === "mention") {
        return (
          <a
            href="#"
            className="text-primary"
            onClick={(e) => e.preventDefault()}
            key={fragmentIndex}
          >
            {fragment.text}
          </a>
        );
      }
      if (fragment.entity?.type === "link") {
        return (
          <a
            href={fragment.entity.value}
            className="text-primary"
            target="_blank"
            itemRef="nofollow"
            key={fragmentIndex}
          >
            {fragment.text}
          </a>
        );
      }
    }
    return <span key={fragmentIndex}>{fragment.text}</span>;
  });
}

export default function PostText({ text, entities }) {
  return <div>{mapFragmentsToComponents(textFragments(text, entities))}</div>;
}
