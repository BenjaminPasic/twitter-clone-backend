const env = require("dotenv").config();
const express = require("express");
const server = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");

//Express has to be set up this way in order to work with express on the same port
const httpServer = createServer(server);

//Route imports
const userRoutes = require("./routes/UserRoutes");
const postRoutes = require("./routes/PostRoutes");
const likeRoutes = require("./routes/LikeRoutes");
const commentRoutes = require("./routes/CommentRoutes");
const commentLikeRoutes = require("./routes/CommentLikeRoutes");
const commentRepliesRoutes = require("./routes/CommentRepliesRoutes");
const followRoutes = require("./routes/FollowRoutes");
const conversationRoutes = require("./routes/ConversationRoutes");

//Cookie parser
server.use(cookieParser());

//Cors setup
server.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Logger for requests
server.use(morgan("tiny"));

//Parsers for json and url encoding
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//Include routes
server.use("/user", userRoutes);
server.use("/post", postRoutes);
server.use("/like", likeRoutes);
server.use("/comment", commentRoutes);
server.use("/commentlike", commentLikeRoutes);
server.use("/commentreply", commentRepliesRoutes);
server.use("/follow", followRoutes);
server.use("/conversation", conversationRoutes);

//socketio seperated logic
const io = new Server(httpServer, {
  cors: {
    origin: true,
    credentials: true,
  },
  cookie: true,
});

require("./config/socket-io")(io);

httpServer.listen(process.env.PORT || 3001, () => {
  console.log("Process running on port:" + PORT);
});
