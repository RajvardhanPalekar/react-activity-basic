import { useState, useEffect } from "react";

import Header from "./components/Header";
import Activities from "./components/Activities";
import AddActivity from "./components/AddActivity";

function App() {
  const [showAdd, setShowAdd] = useState(false);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const getActivities = async () => {
      const activitiesFromServer = await fetchActivities();
      setActivities(activitiesFromServer);
    };
    getActivities();
  }, []);

  //Fetch Activities
  const fetchActivities = async () => {
    const res = await fetch("http://localhost:5000/activities");
    const data = await res.json();

    return data;
  };

  //Fetch Activity by Id
  const fetchActivity = async (id) => {
    const res = await fetch(`http://localhost:5000/activities/${id}`);
    const data = await res.json();

    return data;
  };

  //Add Activity
  const addActivity = async (activity) => {
    // console.log(activity);
    // const id = Math.floor(Math.random() * 10000) + 1;

    // const newActivity = { id, ...activity };

    const res = await fetch(`http://localhost:5000/activities`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(activity),
    });

    const newActivity = await res.json();
    setActivities([...activities, newActivity]);
  };

  //Delete activity
  const deleteActivity = async (id) => {
    await fetch(`http://localhost:5000/activities/${id}`, { method: "DELETE" });
    setActivities(activities.filter((activity) => activity.id !== id));
  };

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const activityToToggle = await fetchActivity(id);
    const payload = {
      ...activityToToggle,
      reminder: !activityToToggle.reminder,
    };
    const res = await fetch(`http://localhost:5000/activities/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    setActivities(
      activities.map((activity) =>
        activity.id === id ? { ...activity, reminder: data.reminder } : activity
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
