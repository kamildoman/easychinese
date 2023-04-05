import React, { FC, useState } from "react";
import { Word } from "@/models/flashcard";
import { Row, Typography } from "antd";
import { SoundFilled } from "@ant-design/icons";
import * as zhuyin from "zhuyin";
import { AutoTextSize } from "auto-text-size";

interface Props {
  flashcard: Word;
  showAnswer: boolean;
  setShowAnswer: (showAnswer: boolean) => void;
  showPinyin: boolean;
  setShowPinyin: (showPinyin: boolean) => void;
}

export const Flashcard: FC<Props> = ({
  flashcard,
  showPinyin,
  setShowPinyin,
  showAnswer,
  setShowAnswer
}) => {
  const [audioPlaying, setAudioPlaying] = useState(false);

  const handleCardClick = () => {
    setShowAnswer(!showAnswer);
  };

  const handlePinyinClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    playAudio();
    setShowPinyin(true);
  };

  const playAudio = () => {
    if (typeof window !== "undefined" && !audioPlaying) {
      setAudioPlaying(true);
      const synth = window.speechSynthesis;
      const zhuyinPron = zhuyin.fromPinyin(flashcard.attributes.Pinyin);
      const utterance = new SpeechSynthesisUtterance(
        zhuyinPron.join("").replace("`", "ˋ")
      );
      utterance.lang = "zh-CN";
      utterance.voiceURI = "Google 普通话（中国大陆）";
      utterance.volume = 10;
      utterance.rate = 0.7;
      utterance.pitch = 1;

      utterance.onend = () => {
        setAudioPlaying(false);
      };

      synth.speak(utterance);
    }
  };

  return (
    <>
      <div
        className={`flip-card ${showAnswer ? "flipped" : ""}`}
        onClick={handleCardClick}
      >
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
              {!showPinyin ? (
                <div className="pinyin-container">
                  <Typography className="card-sticker" onClick={handlePinyinClick}>
                    pinyin
                  </Typography>
                </div>
              ) : (
                <div className="pinyin-container">
                  <FlashcardText text={flashcard.attributes.Pinyin} isPinyin={true}/>
                </div>
              )}
              <FlashcardText text={flashcard.attributes.Chinese} isPinyin={false}/>
            </div>
          </div>
          <div className="flip-card-back">
              <FlashcardText text={flashcard.attributes.English} isPinyin={false}/>
          </div>
        </div>
      </div>
      <Row justify="center" className="mt-2">
        <SoundFilled
          className="text-xl cursor-pointer"
          style={{ color: audioPlaying ? "red" : "black" }}
          onClick={() => playAudio()}
        />
      </Row>
    </>
  );
};

const FlashcardText = ({ text, isPinyin }) => {
  return (
    <Typography
      style={{
        flex: "1",
        whiteSpace: "nowrap",
        overflow: "hidden",
        padding: "0 15px",
        justifyContent: "center"
      }}
    >
      <AutoTextSize maxFontSizePx={isPinyin ? 70 : 110}>{text}</AutoTextSize>
    </Typography>
  );
};