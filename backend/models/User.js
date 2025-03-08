// backend/models/User.js - User, Bookmark, and Note Schemas
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firebaseUid: { type: String, unique: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const BookmarkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  surah: { type: Number, required: true },
  ayah: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  surah: { type: Number, required: true },
  ayah: { type: Number, required: true },
  note: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);
const Bookmark = mongoose.model("Bookmark", BookmarkSchema);
const Note = mongoose.model("Note", NoteSchema);

module.exports = { User, Bookmark, Note };
