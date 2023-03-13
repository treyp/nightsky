# Nightsky

Nightsky is a web client for [Bluesky](https://bsky.app/) and other services based on the [AT Protocol](https://atproto.com/).

The project was scaffolded using [Vite](https://vitejs.dev/)'s [React template](https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react). It is styled using [Tailwind CSS](https://tailwindcss.com/) with the [daisyUI](https://daisyui.com/) plugin. Routing happens with [React Router](https://reactrouter.com/en/main).

At this time, this app is served on [GitHub Pages](https://pages.github.com/) so that its source code can be trusted. This limits it to a static site implementation only.

## Setup

Set up [Node.js](https://nodejs.org/en/) 18 and npm 9.

Use `npm` for dependency management:

```bash
npm install
```

## Development

To start the dev server, run:

```bash
npm run dev
```

This app is hosted on GitHub Pages. To preview the output for Pages, create a build and run the `preview` script to serve it locally:

```bash
npm run build
npm run preview
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Roadmap

Here's an unprioritized list of tasks to do:

- [ ] Support entitites in post text
- [ ] Add individual post page
- [ ] Add profile page, link Profile in nav to user's profile page
- [ ] Add Search page
- [ ] Add Notifications page
- [ ] Add Settings page
- [ ] Support light mode with override in settings page
- [ ] TypeScript support
- [ ] Offline mode with cached data
- [ ] Move these TODO items to GitHub Issues once the repo is more stable
