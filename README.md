# Nightsky

Nightsky is a web client for [Bluesky](https://bsky.app/) and other services based on the [AT Protocol](https://atproto.com/).

The project was scaffolded using [Vite](https://vitejs.dev/)'s [React TypeScript template](https://github.com/vitejs/vite/tree/151099628310d27c0b526b31ba74b8b258fb59b5/packages/create-vite/template-react-ts). It is styled using [Tailwind CSS](https://tailwindcss.com/) with the [daisyUI](https://daisyui.com/) plugin and [heroicons](https://heroicons.com/). Routing happens with [React Router](https://reactrouter.com/en/main).

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

- [ ] Add Search page
- [ ] Add Notifications page
- [ ] Add Settings page
- [ ] Support light mode with override in settings page
- [ ] Offline mode with cached data
- [ ] Move these TODO items to GitHub Issues once the repo is more stable
