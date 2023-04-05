import { Button, Layout, Row } from "antd";
import { FC, useContext } from "react";
import { AppContext } from "@/pages/_app";
import axios from "axios";
import { Lesson } from "@/models/flashcard";
import Router from "next/router";
import {routes} from "@/config/routes";

interface Props {
  lessons: Lesson[];
}

const Lessons: FC<Props> = ({ lessons }) => {
  const { user } = useContext(AppContext);

  // const addLessonsData = () => {
  //   const data = [
  //     {
  //       Name: "This is my dad",
  //       Number: 2,
  //       Section: "HSK1",
  //     },
  //   ];
  //
  //   data.map(async (word) => {
  //     const response = await axios.post(
  //         `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lessons`,
  //         {
  //           data: {
  //             Name: word.Name,
  //             Number: word.Number,
  //             Section: word.Section,
  //           }
  //         }
  //     );
  //   });
  // };

  // const addData = () => {
  //   const data = [
  //     {
  //       Chinese: "有",
  //       Pinyin: "yǒu",
  //       English: "to have",
  //       lesson: 5
  //     },
  //   ];
  //
  //   data.map(async (word) => {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/words`,
  //       {
  //         data: {
  //           Chinese: word.Chinese,
  //           Pinyin: word.Pinyin,
  //           English: word.English,
  //           lesson: word.lesson
  //         }
  //       }
  //     );
  //   });
  // };

  return (
    <Layout className="w-100 h-100">
      {/*<Button onClick={() => addData()}>ADD DATA</Button>*/}
      {/*<Button onClick={() => addLessonsData()}>ADD DATA LESSON</Button>*/}
      <Row>
        {lessons?.map((lesson, index) => (
          <Button onClick={() => Router.push(`${routes.lessons}/${lesson.id}`)} key={index}>
            Lesson {lesson.attributes.Number}
          </Button>
        ))}
      </Row>
    </Layout>
  );
};

Lessons.getInitialProps = async (ctx) => {
  let lessons = null;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/lessons/`
    );
    lessons = response?.data?.data;
  } catch (err) {
    console.log(err);
  }

  return { lessons };
};

export default Lessons;