import { AnimatePresence, motion, useAnimation } from "framer-motion"

export default function IdeasImage({src,alt}){
    const controls = useAnimation();


    return(<>
        <AnimatePresence>
        <motion.img
            className="ideas-thumbnail"
            src='https://www.equinoxindia.com/wp-content/uploads/images/commercial-real-estate-projects.jpg'
            alt={alt}
            initial={{ scale: 1 }}
            exit={{ scale: 2 }}
            animate={controls} // Use the custom controls for animation
            />
        </AnimatePresence>    
    </>)
}