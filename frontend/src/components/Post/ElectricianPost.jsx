electricianPosts.map((posts) => (
  <div
    key={posts.id}
    className="bg-white mt-5 rounded-lg md:shadow-md"
  >
    <div className="flex p-5 gap-5 items-start">
      <div className="flex-shrink-0">
        <img
          src={profilePhoto}
          alt="Profile"
          className="rounded-full w-16 h-16 object-cover"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold mt-1">
          {posts.electricianId.electricianName}
        </h2>

        <h5 className="text-sm text-gray-500">
          {format(posts.createdAt)}
        </h5>
      </div>
      <div className="ml-auto">
        {posts.electricianId ? (
          <div>
            <h4 className="text-lg font-semibold">Electrician</h4>
            <span className="flex gap-5">
              <h6 className="text-sm text-gray-500">Report</h6>
              <p className="text-sm text-gray-500">Delete</p>
            </span>
          </div>
        ) : (
          <div>
            <h4 className="text-lg font-semibold">Shop</h4>
            <h6 className="text-sm text-gray-500">Report</h6>
          </div>
        )}
      </div>
    </div>

    <div className="px-5 text-justify">
      <p>{posts.description}</p>
    </div>

    <div className="p-5  w-full text-center">
      {posts.fileName.length > 1 ? (
        <Slider {...settings}>
          {posts.fileName.map((fileName, index) => (
            <div key={index}>
              {fileName.endsWith(".mp4") ? (
                <video
                  controls
                  className="w-full h-[350px] object-fill"
                >
                  <source
                    src={ELECTRICIAN_POSTS_DIR_PATH + fileName}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  className="w-full h-[350px] object-fill"
                  src={ELECTRICIAN_POSTS_DIR_PATH + fileName}
                  alt={`Image ${index}`}
                />
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <span>
          {posts.fileName[0].endsWith(".mp4") ? (
            <video controls>
              <source
                src={ELECTRICIAN_POSTS_DIR_PATH + posts.fileName[0]}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              src={ELECTRICIAN_POSTS_DIR_PATH + posts.fileName[0]}
              alt="Smvs"
            />
          )}
        </span>
      )}
    </div>

    <div className="flex pb-5 justify-around text-center">
      <div className="flex gap-2 cursor-pointer">
        <div onClick={() => handleLikeButtonClick(posts?._id)}>
          {posts.likes?.includes(
            electricianInfo?._id.toString() + electricianInfo.name
          ) ? (
            <AiFillLike size={20} color="blue" />
          ) : (
            <AiFillLike size={20} Like />
          )}
        </div>
        <p onClick={() => handleLikeClick(posts._id)}>
          {posts?.likes?.length} Likes
        </p>
      </div>

      <div className="flex gap-2 cursor-pointer">
        <FaRegCommentDots />
        <h2
          onClick={() => {
            handleCommentClick(posts._id);
          }}
        >
          COMMENT
        </h2>
      </div>
      <div className="flex gap-2">
        <MdOutlineIosShare />
        <h2>SHARE</h2>
      </div>
      <div className="flex gap-2">
        <CiSaveDown2 />
        <h2>SAVE</h2>
      </div>
    </div>

    {showCommentsMap[posts._id] && (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission behavior
            commentSubmitHandler(e, posts._id);
          }}
        >
          <div className="flex items-center gap-4 border-t border-gray-300 p-4">
            <img
              src={profilePhoto}
              className="w-9 h-9 rounded-full object-cover"
              alt="Profile"
            />
            <div className="flex-1">
              <InputEmoji
                placeholder="What's on your mind?"
                value={description}
                cleanOnEnter
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevents the default newline behavior
                    commentSubmitHandler(e, posts._id);
                  }
                }}
                className="w-full px-4 h-10 border-b border-solid border-blue-500 focus:outline-none focus:border-b-blue-700 text-16 leading-7 text-black placeholder:text-gray-500 rounded-md cursor-pointer"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-1 bg-buttonColor text-white rounded-md hover:bg-blue-700 focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
        <div
          className="comments-container scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-gray-300"
          style={{
            maxHeight: "400px",
            overflowX: "hidden",
            overflowY: "auto",
          }}
        >
          <div>
            {postComment && postComment.length > 0 ? (
              postComment.map((comments, index) => (
                <div
                  key={index}
                  className="w-full border-t-2 m-2 py-2"
                >
                  <div className="flex gap-3 items-center mb-1">
                    <img
                      src={profilePhoto}
                      className="w-9 h-9 rounded-full object-cover"
                      alt="Profile"
                    />
                    <div>
                      <p className="font-medium text-base text-ascent-1">
                        {comments.electricianId.electricianName}
                      </p>
                      <span className="text-ascent-2 text-sm">
                        {format(comments.updatedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="ml-12 mr-8">
                    <p className="text-ascent-2 text-justify">
                      {comments.comment}
                    </p>
                    {/* <div className="mt-2 flex gap-6">
                      <div
                        className="text-xs cursor-pointer flex gap-2"
                        onClick={handleLikeClick}
                      >
                        <AiFillLike />
                        <p>LIKE </p>
                      </div>
                      <div className="text-xs cursor-pointer flex gap-2">
                        <BsReply />
                        <p onClick={handleReplyCommentClick}>
                          REPLY
                        </p>
                      </div>
                    </div> */}

                    {replyComments && (
                      <div className="flex items-center gap-4 border-t border-gray-300 pt-4">
                        <img
                          src={profilePhoto}
                          className="w-9 h-9 rounded-full object-cover"
                          alt="Profile"
                        />
                        <div className="flex-1">
                          <textarea
                            placeholder="What's Your reply?"
                            name="description"
                            className="w-full px-4 h-10 border-b border-solid border-blue-500 focus:outline-none focus:border-b-blue-700 text-16 leading-7 text-black placeholder:text-gray-500 rounded-md cursor-pointer"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="px-4 py-1 bg-buttonColor text-white rounded-md hover:bg-blue-700 focus:outline-none"
                        >
                          Submit
                        </button>
                        <h6
                          className="cursor-pointer"
                          onClick={handleShowRepliedComment}
                        >
                          (Show Replies)
                        </h6>
                      </div>
                    )}
                  </div>

                  {showRepliedComment && (
                    <div className="px-8">
                      <div className="flex gap-3 ml-16 items-center m-1">
                        <img
                          src={profilePhoto}
                          className="w-7 h-7 rounded-full object-cover"
                          alt="Profile"
                        />
                        <div>
                          <p className="font-medium text-sm text-ascent-1">
                            Robert R
                          </p>
                          <span className="text-xs">
                            14-08-2023
                          </span>
                        </div>
                      </div>
                      <p className="ml-[104px] text-base text-justify">
                        Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Quam dicta debitis placeat
                        quae facere voluptates!
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-ascent-2 text-sm">
                No comments available
              </p>
            )}
          </div>
        </div>
      </>
    )}
  </div>
))