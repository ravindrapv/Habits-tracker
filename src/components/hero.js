function Hero(props) {
  const title = props.title;
  const description = props.description;
  return (
    <div className=" bg-emerald-100 p-2 flex items-center flex-col justify-evenly w-screen">
      <h1 className="blue text-3xl capitalize p-3">
        {title ? title : "Habit track app"}
      </h1>
      <p className=" pink text-lg p-3">
        {description ? description : "A place to add habits."}
      </p>
    </div>
  );
}

export default Hero;
