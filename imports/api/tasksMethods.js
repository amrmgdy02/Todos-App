import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

const authorizeUser = function () {
  if (!this.userId) {
    throw new Meteor.Error("not-authorized");
  }
};

Meteor.methods({
  "tasks.insert"(doc) {
    authorizeUser.call(this);
    doc.userId = this.userId;
    return TasksCollection.insertAsync(doc);
  },
  
  "tasks.toggleChecked"({ _id, isChecked }) {
    authorizeUser.call(this);
    
    return TasksCollection.updateAsync(_id, {
      $set: { isChecked: !isChecked },
    });
  },

  "tasks.delete"(_id) {
    authorizeUser.call(this);
    return TasksCollection.removeAsync(_id);
  },

  "tasks.update"({ _id, text, dueDate }) {
    authorizeUser.call(this);
    return TasksCollection.updateAsync(_id, {
      $set: { text, dueDate },
    });
  },
});