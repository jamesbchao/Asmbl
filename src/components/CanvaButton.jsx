import React from 'react';

export default class CanvaButton extends React.Component {
    render() {
        return (
            <div>
                <span data-design-type="Infographic" data-button-size="default" data-button-theme="default" data-api-key="JzboDsLMnVua1WZkymMXg9Kx"
                class="canva-design-button" style="display:none;">Design on Canva</span>
                <script>
                (function(c,a,n) {
                    var w = c.createElement(a),s=c.getElementsByTagName(a)[0];
                    w.src=n;s.parentNode.insertBefore(w,s);
                })(document,'script','https://sdk.canva.com/designbutton/v2/api.js');
                </script>
            </div>
        )
    }
}