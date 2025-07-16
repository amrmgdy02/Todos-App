import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';

Meteor.publish('tasks', function tasksPublication() {
  if (!this.userId) {
    return this.ready();
  }

  return TasksCollection.find({ userId: this.userId });
});