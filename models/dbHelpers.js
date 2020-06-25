// where we ewrit our knex queries
// const knex = require('knex');
// const config = require('../knexfile');
// const db = knex(config.development);
const db = require('../dbConfig');

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  findMessageById,
  addMessage,
  findAllLessonMessages,
  removeMessage,
};

async function add(lesson) {
  const [id] = await db('lessons').insert(lesson);

  return findById(id);
}

function find() {
  return db('lessons');
}

function findById(id) {
  return db('lessons')
    .where({ id })
    .first();
}

function remove(id) {
  return db('lessons')
    .where({ id })
    .del();
}

function update(id, changes) {
  return (
    db('lessons')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id);
      })
  );
}

function findMessageById(id) {
  return db("messages")
    .where({ id })
    .first();
}

async function addMessage(message, lesson_id) {
  const [id] = await db("messages")
    .where({ lesson_id })
    .insert(message);

  return findMessageById(id);
}

function findAllLessonMessages(lesson_id) {
  return db("lessons")
    .join("messages", "lessons.id", "messages.lesson_id")
    .select(
      "lessons.id as LessonID",
      "lessons.name as LessonName",
      "messages.id as MessageID",
      "messages.sender",
      "messages.text"
    )
    .where({ lesson_id });
}

function removeMessage(id) {
  return db("messages")
    .where({ id })
    .del();
}