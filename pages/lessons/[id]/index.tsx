import axios from "axios";
import { Lesson } from "@/models/flashcard";
import { FC, useRef, useState } from "react";
import { Button, Carousel, Col, Layout, Row, Typography } from "antd";
import { Flashcard } from "@/components/flashcards/Flashcard";

interface Props {
  chosenLesson: Lesson;
}

const SingleLesson: FC<Props> = ({ chosenLesson }) => {
  const carouselRef = useRef(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const handleNextCard = () => {
    carouselRef.current.next();
  };

  return (
    <Layout className="w-100 h-100">
      <Row justify="center">
        <Typography.Title>
          Lesson {chosenLesson.attributes.Number}: {chosenLesson.attributes.Name}
        </Typography.Title>
      </Row>
      <Col>
        {chosenLesson?.attributes?.words &&
          chosenLesson.attributes.words?.data?.length > 0 && (
            <Carousel
              slidesToShow={1}
              dots={false}
              ref={carouselRef}
              swipeToSlide
              draggable
              beforeChange={() => {
                setShowAnswer(false);
                setShowPinyin(false);
              }}
            >
              {chosenLesson.attributes.words.data.map((flashcard, index) => (
                <Flashcard
                  flashcard={flashcard}
                  key={index}
                  setShowAnswer={setShowAnswer}
                  showAnswer={showAnswer}
                  showPinyin={showPinyin}
                  setShowPinyin={setShowPinyin}
                />
              ))}
            </Carousel>
          )}
        <div className="mt-8 flex justify-center">
          <Button onClick={handleNextCard}>Next</Button>
        </div>
      </Col>
    </Layout>
  );
};

SingleLesson.getInitialProps = async (ctx) => {
  const lessonId = ctx.query.id;
  let chosenLesson = null;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lessons/${lessonId}?populate=words`
    );
    chosenLesson = response.data.data;
  } catch (err) {
    console.log(err);
  }
  return { chosenLesson };
};

export default SingleLesson;
