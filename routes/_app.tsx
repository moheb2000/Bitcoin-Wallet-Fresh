/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";

export default function App(props: AppProps) {
  return (
    <>
      <Head>
        <title>Bitcoin Wallet</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/purecss@2.1.0/build/pure-min.css"
          integrity="sha384-yHIFVG6ClnONEA5yB5DJXfW2/KC173DIQrYoZMEtBvGzmf0PKiGyNEqe9N6BNDBH"
          crossOrigin="anonymous"
        >
        </link>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/purecss@2.1.0/build/grids-responsive-min.css"></link>
      </Head>
      <props.Component />
    </>
  );
}
