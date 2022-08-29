/** @jsx h */
import { h } from "preact";

export default function Home() {
  return (
    <main>
      <div class="pure-g">
        <div class="pure-u-1 pure-u-md-1-4"></div>
        <div class="pure-u-1 pure-u-md-1-2">
          <h1>Bitcoin Wallet</h1>
          <p>This is my primary project</p>
          <h2>Introdunction</h2>
          <p>This is bitcoin wallet introdunction</p>
          <h2>Get Started</h2>
          <form action="#" class="pure-form">
            <fieldset>
              <button type="submit" class="pure-button pure-button-primary">
                Create Random
              </button>
            </fieldset>
          </form>
          <h3>Private Key</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="private-key">Private Key</label>
              <input type="text" id="private-key" placeholder="Private Key">
              </input>
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3>Public Key</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="public-key">Public Key</label>
              <input type="text" id="public-key" placeholder="Public Key">
              </input>
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3>Public Key Hash</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="public-key-hash">Public Key Hash</label>
              <input
                type="text"
                id="public-key-hash"
                placeholder="Public Key Hash"
              >
              </input>
              <button type="submit" class="pure-button pure-button-primary">
                Check
              </button>
            </fieldset>
          </form>
          <h3>Public Address</h3>
          <form action="#" class="pure-form  pure-form-stacked">
            <fieldset>
              <label for="step1">Step1</label>
              <input type="text" id="step1" placeholder="Step1" readonly>
              </input>
              <label for="step2">Step2</label>
              <input type="text" id="step2" placeholder="Step2" readonly>
              </input>
              <label for="step3">Step3</label>
              <input type="text" id="step3" placeholder="Step3" readonly>
              </input>
              <label for="step4">Checksum</label>
              <input type="text" id="step4" placeholder="Checksum" readonly>
              </input>
              <label for="step5">Step5</label>
              <input type="text" id="step5" placeholder="Step5" readonly>
              </input>
              <label for="step6">Public Address</label>
              <input
                type="text"
                id="step6"
                placeholder="Public Adress"
                readonly
              >
              </input>
            </fieldset>
          </form>
        </div>
        <div class="pure-u-1 pure-u-md-1-4"></div>
      </div>
    </main>
  );
}
