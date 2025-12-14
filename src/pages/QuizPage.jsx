import QuizComponent from "../component/quiz";

const QuizPage = () => {
  // useEffect(() => {
  //   // if (!document.fullscreenElement) {
  //   //   document.documentElement.requestFullscreen();
  //   // } else

  //   function enterFullscreen() {
  //     const element = document.documentElement;

  //     if (element.requestFullscreen) {
  //       element.requestFullscreen();
  //     } else if (element.webkitRequestFullscreen) {
  //       element.webkitRequestFullscreen();
  //     } else if (element.mozRequestFullScreen) {
  //       element.mozRequestFullScreen();
  //     } else if (element.msRequestFullscreen) {
  //       element.msRequestFullscreen();
  //     }
  //   }

  //   // Call the function
  //   enterFullscreen();

  //   return () => {
  //     document.exitFullscreen();
  //   };
  // }, []);
  // useEffect(() => {
  //   async function enterFullscreen() {
  //     const element = document.documentElement;

  //     try {
  //       if (element.requestFullscreen) {
  //         await element.requestFullscreen();
  //       } else if (element.webkitRequestFullscreen) {
  //         await element.webkitRequestFullscreen();
  //       } else if (element.mozRequestFullScreen) {
  //         await element.mozRequestFullScreen();
  //       } else if (element.msRequestFullscreen) {
  //         await element.msRequestFullscreen();
  //       } else {
  //         console.warn("Fullscreen API not supported");
  //       }
  //     } catch (error) {
  //       console.error("Failed to enter fullscreen:", error);
  //     }
  //   }

  //   // Call the function
  //   enterFullscreen();

  //   // Cleanup function
  //   return () => {
  //     // Check if currently in fullscreen before trying to exit
  //     if (
  //       document.fullscreenElement ||
  //       document.webkitFullscreenElement ||
  //       document.mozFullScreenElement ||
  //       document.msFullscreenElement
  //     ) {
  //       try {
  //         if (document.exitFullscreen) {
  //           document.exitFullscreen();
  //         } else if (document.webkitExitFullscreen) {
  //           document.webkitExitFullscreen();
  //         } else if (document.mozCancelFullScreen) {
  //           document.mozCancelFullScreen();
  //         } else if (document.msExitFullscreen) {
  //           document.msExitFullscreen();
  //         }
  //       } catch (error) {
  //         console.error("Failed to exit fullscreen:", error);
  //       }
  //     }
  //   };
  // }, []);
  return <QuizComponent />;
};

export default QuizPage;
