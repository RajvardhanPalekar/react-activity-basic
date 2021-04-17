import { useState } from "react";

import Header from "./components/Header";
import Activities from "./components/Activities";
import AddActivity from "./components/AddActivity";

function App() {
  const [showAdd, setShowAdd] = useState(false);

  const [activities, setActivities] = useState([
    {
      id: 1,
      text: "Buy Groceries",
      day: "Feb 5th at 2:30pm",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting with Tony",
      day: "Feb 6th at 1:30pm",
      reminder: true,
    },
    {
      id: 3,
      text: "Movie night",
      day: "Feb 5th at 6:30pm",
      reminder: false,
    },
  ]);

  //Add Activity
  const addActivity = (activity) => {
    console.log(activity);
    const id = Math.floor(Math.random() * 10000) + 1;

    const newActivity = { id, ...activity };

    setActivities([...activities, newActivity]);
  };

  //Delete activity
  const deleteActivity = (id) => {
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = (id) => {
    setActivities(
      activities.map((activity) =>
        activity.id === id
          ? { ...activity, reminder: !activity.reminder }
          : activity
      )
    );
  };

  return (
    <div className="container">
      <Header onAdd={() => setShowAdd(!showAdd)} showAdd={showAdd} />
      {showAdd && <AddActivity onAdd={addActivity} />}
      {activities.length > 0 ? (
        <Activities
          activities={activities}
          onDelete={deleteActivity}
          onToggle={toggleReminder}
        />
      ) : (
        "No Activities to show"
      )}
    </div>
  );
}

export default App;
