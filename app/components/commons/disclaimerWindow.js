import styles from '../../cookie.module.css';

export default function DisclaimerWindow(){

    return(
        <>
            <div className={styles.main_box_overlay}>
                <div class={styles.main_box}>
                    <h1>Disclaimer</h1>
                    <p>This Privacy Policy explains how Kuwalsanam Architekts, a Mumbai, India-based architecture firm ("Kuwalsanam
                    Architekts," "we," "us," or "our"), uses the personal data we collect from you when you interact with us through our
                    website, during business dealings, or in any other way. We are committed to protecting your privacy and providing
                    information about our data collection practices.</p>
                    <p>Kuwalsanam Architekts may process personal data of potential and existing clients, collaborators, website visitors
                    ("you"), and any other individual who interacts with us related to our business activities. We may collect, use, store
                    and transfer different kinds of Personal Data about you which we have grouped together as follows:</p>
                    <button className='btn btn-light px-4 rounded-pill'>Continue</button>
                </div >
            </div>
        </>
    );
}