import styled from "styled-components";
import { useSelector } from "react-redux";
import Loader from "react-loader";
import { loaderOptions } from "../utils/utils";

const PostsGrid = ({ postsType }) => {
  const { feed, userPosts, loading } = useSelector((state) => state.post);

  return (
    <>
      {<Loader loaded={!loading} options={loaderOptions} />}
      <PostList>
        {(postsType === "User" ? userPosts : feed).map((image, i) => (
          <Post key={i}>
            <PostImageFigure>
              <PostImage src={image.photoUrl} alt="" />
            </PostImageFigure>
            <PostOverlay>
              <p>
                <PostLike>{image?.likes?.length}</PostLike>
                <PostComment>{image?.comments?.length}</PostComment>
              </p>
            </PostOverlay>
          </Post>
        ))}
      </PostList>
    </>
  );
};

const PostList = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 293px));
  justify-content: center;
  grid-gap: 28px;
  margin-bottom: 6rem;
  @media (max-width: 768px) {
    grid-gap: 3px;
  }
`;

const PostOverlay = styled.span`
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: none;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`;

const Post = styled.a`
  cursor: pointer;
  position: relative;
  display: block;
  &:hover ${PostOverlay} {
    display: flex;
  }
`;

const PostImageFigure = styled.figure`
  margin: 0;
`;
const PostImage = styled.img`
  width: 100%;
  height: 100%;
  vertical-align: top;
  object-fit: cover;
`;

const PostLike = styled.span`
  width: 80px;
  margin: 5px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`;
const PostComment = styled.span`
  width: 80px;
  margin: 5px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
`;

export default PostsGrid;
