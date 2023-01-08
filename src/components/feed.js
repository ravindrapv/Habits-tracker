function Feed(props) {
  return (
    <div className="flex justify-start ml-4 outline-active">
      {props.author ? (
        <span
          onClick={() => {
            props.handleState("myHabits", true);
          }}
          className={`${
            !props.myfeed || props.openTag
              ? "border-gray-400 text-gray-400"
              : "border-blue-900 blue"
          }  cursor-pointer capitalize p-4 border-b-2 border-solid `}
        >
          {props.myArticles ? "Your habits" : "Your Habit"}
        </span>
      ) : (
        ""
      )}
      <span
        onClick={() => {
          props.handleState("myhabit", false);
        }}
        className={`${
          props.openTag || props.myfeed
            ? "border-gray-400 text-gray-400"
            : "border-blue-900 blue"
        }  cursor-pointer capitalize p-4 border-b-2 border-solid `}
      >
        {props.favouritedFeed ? "Favourited habits" : "All users habits"}
      </span>
      {props.openTag ? (
        <span className="blue cursor-pointer capitalize p-4 border-b-2 border-solid border-blue-900">
          #{props.openTag}
        </span>
      ) : (
        ""
      )}
    </div>
  );
}
export default Feed;
