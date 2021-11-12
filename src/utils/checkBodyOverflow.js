const checkBodyOverflow = () => {
  if (document.body.style.overflow !== "hidden") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "scroll";
  }
};

export default checkBodyOverflow;
