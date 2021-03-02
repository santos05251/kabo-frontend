import React from "react";

const NotificationCard = ({ item }) => {
  return (
    <div className="container pb-4 m-4 bg-white p-5 rounded-xl flex-initial inline-block w-accountdetail-card">
      <h4 className="font-semibold">{item.title}</h4>
      <div className="text-xs my-3 mt-1 opacity-70">
        {new Date(item.created_at).toDateString()}
      </div>
      <article className="text-base my-3">{item.description}</article>
      <div className="cursor-pointer text-primary font-bold focus:outline-none my-3">
        View Address Info
      </div>
    </div>
  );
};

export default NotificationCard;
