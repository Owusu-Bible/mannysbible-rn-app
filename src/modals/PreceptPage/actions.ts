import { Precepts, Verse } from "lib_cloud/parse";

import { ParseFunctions } from "lib_cloud/parse/class/parseFunctions";
// import Parse from "parse/react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

export default () => {
  const navigator = useNavigation();
  const { precept } = useRoute()?.params ?? ({} as any);

  const [verses, setVerses] = useState<Verse[]>([]);

  useEffect(() => {
    const getPreceptsVerses = async () => {
      const holdVerses = [];
      for (let i = 0; i < precept.verses.length; i++) {
        const theVerse = precept.verses[i];
        const results = await ParseFunctions.getParseItems(
          Verse as any,
          0,
          undefined,
          [
            { type: "equalTo", key: "bookName", value: theVerse.bookName },
            {
              type: "equalTo",
              key: "chapter",
              value: parseInt(theVerse.chapter),
            },
            {
              type: "greaterThanOrEqualTo",
              key: "verse",
              value: parseInt(theVerse.beginVerse),
            },
            {
              type: "lessThanOrEqualTo",
              key: "verse",
              value: parseInt(theVerse.endVerse),
            },
          ]
        );
        if (results?.[0]) {
          holdVerses.push(results?.[0]);
        }
      }
      setVerses(holdVerses);
    };
    getPreceptsVerses();
  }, []);

  const handleDismissPreceptPage = () => {
    navigator.goBack();
  };
  return { precept, verses, handleDismissPreceptPage };
};
