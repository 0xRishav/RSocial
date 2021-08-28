import styled from "styled-components";
import { useSelector } from "react-redux";
import Loader from "react-loader";
import { loaderOptions } from "../utils/utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { AiOutlineHeart } from "react-icons/ai";
import { RiChat3Line } from "react-icons/ri";
import { FlexBox } from ".";
import { Link } from "react-router-dom";

const PostsGrid = ({ postsType }) => {
  const { feed, userPosts, loading } = useSelector((state) => state.post);

  return (
    <>
      {<Loader loaded={!loading} options={loaderOptions} />}
      <PostList>
        {(postsType === "User" ? userPosts : feed).map(
          (image, i) =>
            image.photoUrl && (
              <Link to={`/post-page/${image._id}`} key={image._id}>
                <Post key={i}>
                  <PostImageFigure>
                    <LazyLoadImage
                      src={image.photoUrl}
                      alt="postPic"
                      effect="blur"
                      style={{
                        verticalAlign: "top",
                        objectFit: "cover",
                        height: "100%",
                        minHeight: "100px",
                        width: "100%",
                      }}
                    />
                  </PostImageFigure>
                  <PostOverlay>
                    <p>
                      <FlexBox
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <AiOutlineHeart />
                        <PostLike>{image?.likes?.length}</PostLike>
                      </FlexBox>
                      <FlexBox
                        flexDirection="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <RiChat3Line />
                        <PostComment>{image?.comments?.length}</PostComment>
                      </FlexBox>
                    </p>
                  </PostOverlay>
                </Post>
              </Link>
            )
        )}
      </PostList>
    </>
  );
};

const PostList = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 293px));
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
