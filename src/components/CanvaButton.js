import React from 'react';

export default class CanvaButton extends React.Component {

    componentDidMount() {
        ((document, url) => {
            const script = document.createElement("script");
            script.src = url;
            script.onload = () => {
              // API initialization
            };
            document.body.appendChild(script);
          })(document, "https://sdk.canva.com/designbutton/v2/api.js");

          (async () => {
            if (!window.Canva || !window.Canva.DesignButton) {
              return;
            }
          
            const api = await window.Canva.DesignButton.initialize({
              apiKey: "JzboDsLMnVua1WZkymMXg9Kx",
            });

            const button = document.querySelector("button");

            button.onclick = () => {
                api.createDesign({
                  design: {
                    type: "Poster",
                  },
                });
              };
          })();

    }



    
}