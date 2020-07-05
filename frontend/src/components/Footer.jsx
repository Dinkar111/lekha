import * as React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div className="top-section">
                    <div className="footer-sec">
                        <p>हामी को हो?</p>
                        <p className="description">लेख एउटा एस्तो मंच हो जहाँ तपाई हामी जस्ता नेपाली लेखकहरु, जसलाई आफ्नो रचना, भाव, लेख र सोचहरु प्रकासित गर्ने सहज र साजा मंच दिलाउछ |</p>
                    </div>
                    <div className="footer-sec">
                        {
                        /* <p>लेख​</p>
                        <p className="description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur, voluptas,
                          accusantium, reiciendis iure ipsa blanditiis necessitatibus enim impedit unde sunt debitis
                          consequatur illo
                            quos dolore ipsam dolores illum commodi velit.</p> */}
                    </div>
                    <div className="footer-sec last">
                        <a>हम्रो बारे</a>
                        <a>सयोग्</a>
                    </div>
                </div>
                {/* <div className="bottom-section">
                    @COPYRIGHT लेख​ 2019
        </div> */}

            </footer>
        )
    }
}