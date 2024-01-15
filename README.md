This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install the node module dependencies using

```bash
yarn install
```

And then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

You will see a Slider component on the homepage

- Which will render couple of images as slides from a different host.
- Every slide will have an audio linked to it.
- On the first load you need to play the audio and then if the audio is playing then slides will change automatically upon completion of audio.
- You can play/pause and mute/unmute the audio.
- You will also see volume controls on the slider
