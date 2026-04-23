"use client";

import { useState, useMemo } from "react";

const QUESTIONS = [
  {id:"g001",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"She _____ her homework before dinner last night.\"",options:["has finished", "had finished", "finished", "was finishing"],answer:1,explanation:"「夕食前に」という過去のある時点よりも前に完了していたことを表すため、過去完了形 had finished が適切。"},
  {id:"g002",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"By next month, I _____ here for five years.\"",options:["will work", "will have worked", "have worked", "am working"],answer:1,explanation:"「来月までに」という未来のある時点までの継続を表すため、未来完了形 will have worked が適切。"},
  {id:"g003",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"I _____ him since we were children.\"",options:["know", "knew", "have known", "am knowing"],answer:2,explanation:"since（〜以来）を伴う継続を表すため、現在完了形 have known が適切。know は状態動詞なので進行形にしない。"},
  {id:"g004",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"When I arrived at the station, the train _____ already.\"",options:["has left", "had left", "was leaving", "left"],answer:1,explanation:"到着した時点より前に電車が出発していたので、過去完了形 had left が適切。"},
  {id:"g005",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"She _____ for the exam for three hours when I called her.\"",options:["studied", "has studied", "had been studying", "was studied"],answer:2,explanation:"過去のある時点までの継続的な動作を強調するため、過去完了進行形 had been studying が適切。"},
  {id:"g006",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"The train _____ at 7:30 tomorrow morning.\"",options:["leaves", "is leaving", "will leave", "left"],answer:0,explanation:"時刻表や確定した予定は現在形で表す。The train leaves at 7:30 が自然。"},
  {id:"g007",category:"grammar",subcategory:"時制",question:"誤りを含む箇所を選べ。\n\n\"(A)I have lived (B)in Tokyo (C)ten years (D)ago.\"",options:["(A) I have lived", "(B) in Tokyo", "(C) ten years", "(D) ago"],answer:0,explanation:"ago は過去の一時点を示すので現在完了形とは共起できない。正しくは I lived in Tokyo ten years ago。"},
  {id:"g008",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"Look! It _____.\"",options:["rains", "is raining", "has rained", "rained"],answer:1,explanation:"Look! は現在進行中の状況を促す表現。今まさに雨が降っていることを表す現在進行形 is raining が適切。"},
  {id:"g009",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"I'll call you as soon as I _____ home.\"",options:["will get", "get", "got", "will have got"],answer:1,explanation:"時・条件を表す副詞節の中では未来のことでも現在形を使う。as soon as I get home が正しい。"},
  {id:"g010",category:"grammar",subcategory:"時制",question:"空所に入る最も適切な語句を選べ。\n\n\"This time next week, I _____ on the beach in Hawaii.\"",options:["relax", "will relax", "will be relaxing", "have relaxed"],answer:2,explanation:"未来のある時点で進行中の動作を表すため、未来進行形 will be relaxing が適切。"},
  {id:"g011",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"You _____ have seen her yesterday. She was in Osaka.\"",options:["must", "cannot", "should", "would"],answer:1,explanation:"「〜したはずがない」という過去の強い否定推量は cannot have +過去分詞 で表す。"},
  {id:"g012",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He _____ have called me, but he didn't.\"",options:["should", "must", "will", "may"],answer:0,explanation:"should have + 過去分詞 で「〜すべきだったのにしなかった」という過去の後悔・非難を表す。"},
  {id:"g013",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She _____ be tired. She's been working all day.\"",options:["must", "can", "will", "shall"],answer:0,explanation:"根拠のある強い推量（〜に違いない）は must で表す。"},
  {id:"g014",category:"grammar",subcategory:"助動詞",question:"次の文の意味に最も近いものを選べ。\n\n\"You need not have told him the truth.\"",options:["真実を伝える必要があった", "真実を伝えなくてもよかったのに伝えた", "真実を伝えてはいけなかった", "真実を伝えるつもりだった"],answer:1,explanation:"need not have + 過去分詞 は「〜する必要がなかったのに（実際はした）」という意味。"},
  {id:"g015",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"When I was a child, I _____ swim across the river.\"",options:["can", "could", "may", "might"],answer:1,explanation:"過去の能力を表すには could を使う。「子供の頃は〜できた」という意味。"},
  {id:"g016",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ you mind opening the window?\"",options:["Will", "Would", "Shall", "May"],answer:1,explanation:"Would you mind ~ing? は丁寧な依頼表現。「〜していただけませんか」の意味。"},
  {id:"g017",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He _____ be at home now; I saw him leave an hour ago.\"",options:["must", "cannot", "may", "should"],answer:1,explanation:"「〜のはずがない」という強い否定推量は cannot で表す。「今家にいるはずがない」の意味。"},
  {id:"g018",category:"grammar",subcategory:"助動詞",question:"次の文とほぼ同じ意味の文を選べ。\n\n\"He may well be angry.\"",options:["彼は怒っているかもしれない", "彼が怒るのも当然だ", "彼は怒っているに違いない", "彼は怒るべきだ"],answer:1,explanation:"may well は「〜するのももっともだ／十分ありうる」という意味。根拠のある推量・容認を表す。"},
  {id:"g019",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"You _____ better leave now, or you will miss the train.\"",options:["have", "had", "should", "ought"],answer:1,explanation:"had better + 動詞の原形 で「〜した方がよい」という忠告を表す。"},
  {id:"g020",category:"grammar",subcategory:"助動詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I _____ rather stay home tonight.\"",options:["would", "should", "could", "might"],answer:0,explanation:"would rather + 動詞の原形 で「むしろ〜したい」という意味を表す。"},
  {id:"g021",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"If I _____ you, I would accept the offer.\"",options:["am", "were", "had been", "would be"],answer:1,explanation:"仮定法過去（現在の事実と反対の仮定）では be 動詞は原則 were を使う。"},
  {id:"g022",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"If she _____ harder, she would have passed the exam.\"",options:["studied", "had studied", "studies", "has studied"],answer:1,explanation:"仮定法過去完了（過去の事実と反対の仮定）は If + 主語 + had 過去分詞, 主語 + would have 過去分詞 の形。"},
  {id:"g023",category:"grammar",subcategory:"仮定法",question:"次の文を仮定法で書き換えたとき、空所に入る語句を選べ。\n\n\"As I don't have enough money, I can't buy the car.\"\n→ \"If I _____ enough money, I could buy the car.\"",options:["have", "had", "had had", "would have"],answer:1,explanation:"現在の事実と反対の仮定なので、仮定法過去 had を使う。"},
  {id:"g024",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"I wish I _____ how to drive.\"",options:["know", "knew", "have known", "will know"],answer:1,explanation:"I wish + 仮定法過去 は「〜ならいいのに」という現在の願望を表す。"},
  {id:"g025",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"If it _____ for your help, I couldn't have finished the work.\"",options:["weren't", "hadn't been", "isn't", "wasn't"],answer:1,explanation:"If it had not been for ~ は「もし〜がなかったら」という過去の事実と反対の仮定。Without / But for でも言い換え可。"},
  {id:"g026",category:"grammar",subcategory:"仮定法",question:"次の文に最も近い意味を選べ。\n\n\"He talks as if he knew everything.\"",options:["彼は本当にすべて知っている", "彼はまるですべてを知っているかのように話す", "彼はすべて知りたがっている", "彼はすべて知るべきだ"],answer:1,explanation:"as if + 仮定法過去 は「まるで〜であるかのように」という現在の事実と異なる様子を表す。"},
  {id:"g027",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ I known the truth, I would have told you.\"",options:["If", "Had", "Having", "Would"],answer:1,explanation:"仮定法過去完了の if は省略でき、その場合 had が文頭に出る（倒置）。Had I known = If I had known。"},
  {id:"g028",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"It's time you _____ to bed.\"",options:["go", "went", "have gone", "will go"],answer:1,explanation:"It is (high/about) time + 仮定法過去 は「もう〜する時間だ（まだしていない）」という意味。"},
  {id:"g029",category:"grammar",subcategory:"仮定法",question:"次の文とほぼ同じ意味の文を選べ。\n\n\"Without water, we couldn't live.\"",options:["If we don't have water, we can't live.", "If it were not for water, we couldn't live.", "If we had water, we could live.", "Unless we have water, we can live."],answer:1,explanation:"Without〜は If it were not for〜（〜がなければ）と同義。仮定法過去の表現。"},
  {id:"g030",category:"grammar",subcategory:"仮定法",question:"空所に入る最も適切な語句を選べ。\n\n\"I wish I _____ harder when I was young.\"",options:["studied", "had studied", "have studied", "study"],answer:1,explanation:"I wish + 仮定法過去完了 は「〜だったらよかったのに」という過去の後悔を表す。"},
  {id:"g031",category:"grammar",subcategory:"受動態",question:"能動態を受動態に書き換えたとき、空所に入る語句を選べ。\n\n\"They say that he is honest.\"\n→ \"He _____ to be honest.\"",options:["is said", "said", "says", "is saying"],answer:0,explanation:"They say that S V は S is said to V に書き換えられる。"},
  {id:"g032",category:"grammar",subcategory:"受動態",question:"空所に入る最も適切な語句を選べ。\n\n\"The children _____ by their grandparents while their parents were away.\"",options:["took care", "were taken care of", "were taken care", "took care of"],answer:1,explanation:"take care of（群動詞）の受動態は be taken care of。of を忘れないこと。"},
  {id:"g033",category:"grammar",subcategory:"受動態",question:"空所に入る最も適切な語句を選べ。\n\n\"The book _____ by Natsume Soseki in 1905.\"",options:["wrote", "was wrote", "was written", "has written"],answer:2,explanation:"「書かれた」という受動を表すため was written が適切。write の過去分詞は written。"},
  {id:"g034",category:"grammar",subcategory:"受動態",question:"空所に入る最も適切な語句を選べ。\n\n\"I was surprised _____ the news.\"",options:["at", "by", "with", "to"],answer:0,explanation:"be surprised at（〜に驚く）は定型表現。"},
  {id:"g035",category:"grammar",subcategory:"受動態",question:"空所に入る最も適切な語句を選べ。\n\n\"The bridge is _____ repaired now.\"",options:["being", "been", "be", "is"],answer:0,explanation:"現在進行形の受動態は be being + 過去分詞 の形。is being repaired で「今修理されている」。"},
  {id:"g036",category:"grammar",subcategory:"受動態",question:"能動態を受動態に書き換えたとき、空所に入る語句を選べ。\n\n\"They have built a new school here.\"\n→ \"A new school _____ here.\"",options:["has built", "has been built", "was built", "is built"],answer:1,explanation:"現在完了形の受動態は have/has been + 過去分詞。"},
  {id:"g037",category:"grammar",subcategory:"受動態",question:"空所に入る最も適切な語句を選べ。\n\n\"She is known _____ her kindness.\"",options:["by", "for", "with", "as"],answer:1,explanation:"be known for ~（〜で知られている）は特徴・理由を表す。be known as は「〜として知られている」。"},
  {id:"g038",category:"grammar",subcategory:"受動態",question:"空所に入る最も適切な語句を選べ。\n\n\"The mountain _____ with snow in winter.\"",options:["covers", "is covered", "has covered", "covering"],answer:1,explanation:"be covered with（〜で覆われる）は定型表現。"},
  {id:"g039",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I have a lot of work _____ today.\"",options:["do", "to do", "doing", "done"],answer:1,explanation:"名詞を修飾する形容詞的用法の不定詞。「今日すべき仕事」の意味。"},
  {id:"g040",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He worked hard _____ his family.\"",options:["support", "to support", "supporting", "supported"],answer:1,explanation:"目的を表す副詞的用法の不定詞。「家族を支えるために」の意味。"},
  {id:"g041",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"It is important _____ honest.\"",options:["be", "being", "to be", "been"],answer:2,explanation:"It is + 形容詞 + to 不定詞 の構文。「正直であることは重要だ」の意味。"},
  {id:"g042",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This book is too difficult for me _____.\"",options:["read", "to read", "reading", "to reading"],answer:1,explanation:"too ~ to 不定詞（あまりに〜なので…できない）の構文。"},
  {id:"g043",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She is said _____ a famous writer.\"",options:["be", "to be", "being", "to being"],answer:1,explanation:"be said to be で「〜と言われている」。to 不定詞を伴う構文。"},
  {id:"g044",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He seems _____ the news already.\"",options:["to know", "to have known", "knowing", "known"],answer:1,explanation:"seem to have + 過去分詞 は「〜したように思える」。主節の動詞より以前の時を表す。"},
  {id:"g045",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I don't know what _____.\"",options:["do", "to do", "doing", "did"],answer:1,explanation:"疑問詞 + to 不定詞 は「何を〜すべきか」を表す名詞句を作る。"},
  {id:"g046",category:"grammar",subcategory:"不定詞",question:"空所に入る最も適切な語句を選べ。\n\n\"It was kind _____ you to help me.\"",options:["for", "of", "to", "by"],answer:1,explanation:"人の性格を表す形容詞（kind, nice, wise など）の場合は of + 人 を使う。"},
  {id:"g047",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I'm looking forward to _____ you again.\"",options:["see", "seeing", "have seen", "be seeing"],answer:1,explanation:"look forward to の to は前置詞なので、後には動名詞（ing）が続く。"},
  {id:"g048",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He finished _____ the report.\"",options:["to write", "writing", "written", "write"],answer:1,explanation:"finish は動名詞を目的語にとる動詞。finish ~ing で「〜し終える」。"},
  {id:"g049",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I regret _____ you that your application has been rejected.\"",options:["to tell", "telling", "told", "having told"],answer:0,explanation:"regret to tell は「残念ながら〜を伝える」（これから伝える）。regret telling は「〜したことを後悔する」（すでに伝えた）。"},
  {id:"g050",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"It is no use _____ over spilt milk.\"",options:["cry", "to cry", "crying", "cried"],answer:2,explanation:"It is no use ~ing は「〜しても無駄だ」という定型表現。「覆水盆に返らず」の慣用句。"},
  {id:"g051",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I remember _____ him at the party last year.\"",options:["to meet", "meeting", "met", "to have met"],answer:1,explanation:"remember ~ing は「〜したことを覚えている」（過去）。remember to do は「〜することを忘れない」（未来）。"},
  {id:"g052",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Would you mind _____ the door?\"",options:["to close", "closing", "closed", "close"],answer:1,explanation:"mind は動名詞を目的語にとる。Would you mind ~ing? は「〜していただけますか」。"},
  {id:"g053",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I'm used to _____ up early.\"",options:["get", "getting", "got", "be getting"],answer:1,explanation:"be used to ~ing は「〜することに慣れている」。used to + 動詞の原形（以前は〜した）と混同注意。"},
  {id:"g054",category:"grammar",subcategory:"動名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"There is no _____ what he will do next.\"",options:["know", "to know", "knowing", "known"],answer:2,explanation:"There is no ~ing は「〜することはできない」という定型表現。"},
  {id:"g055",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The man _____ over there is my father.\"",options:["stand", "stands", "standing", "stood"],answer:2,explanation:"現在分詞が名詞を後ろから修飾する用法。「あそこに立っている男性」の意味。"},
  {id:"g056",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The language _____ in this country is Spanish.\"",options:["speak", "speaking", "spoken", "to speak"],answer:2,explanation:"過去分詞が名詞を後ろから修飾する用法。「話されている言語」の意味（受動）。"},
  {id:"g057",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ tired, he went to bed early.\"",options:["Feel", "Feeling", "Felt", "To feel"],answer:1,explanation:"分詞構文で理由を表す。「疲れていたので」の意味。主語が he で能動なので現在分詞を使う。"},
  {id:"g058",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ in easy English, this book is good for beginners.\"",options:["Writing", "Written", "Wrote", "Being written"],answer:1,explanation:"分詞構文で受動を表す。「易しい英語で書かれているので」の意味。Being written の Being は省略可能。"},
  {id:"g059",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The movie was very _____.\"",options:["excite", "exciting", "excited", "to excite"],answer:1,explanation:"映画が「人を興奮させる」性質を表すので現在分詞 exciting。excited は「人が興奮している」状態。"},
  {id:"g060",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I was _____ by the news.\"",options:["shock", "shocking", "shocked", "to shock"],answer:2,explanation:"人がショックを受けた状態を表すので過去分詞 shocked を使う。"},
  {id:"g061",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"With his eyes _____, he listened to the music.\"",options:["close", "closing", "closed", "to close"],answer:2,explanation:"付帯状況の with + 名詞 + 過去分詞。「目を閉じて」の意味。eyes が「閉じられている」ので過去分詞。"},
  {id:"g062",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The audience was _____ to hear the news.\"",options:["surprising", "surprised", "surprise", "to surprise"],answer:1,explanation:"人が「驚いた」状態なので過去分詞 surprised を使う。"},
  {id:"g063",category:"grammar",subcategory:"分詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ no bus service, we had to walk home.\"",options:["There being", "Being", "There was", "It being"],answer:0,explanation:"独立分詞構文。There is 構文が分詞構文になると There being の形になる。「バスがなかったので」の意味。"},
  {id:"g064",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The boy _____ is playing the piano is my brother.\"",options:["who", "which", "what", "whose"],answer:0,explanation:"先行詞が人（the boy）で、関係詞節内で主語の役割をするので who を使う。"},
  {id:"g065",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This is the book _____ I bought yesterday.\"",options:["who", "which", "whose", "where"],answer:1,explanation:"先行詞が物（the book）で、関係詞節内で目的語の役割をするので which を使う（that でも可）。"},
  {id:"g066",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I know a girl _____ father is a doctor.\"",options:["who", "which", "whose", "whom"],answer:2,explanation:"「少女の父親」という所有関係を表すので所有格の関係代名詞 whose を使う。"},
  {id:"g067",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This is the house _____ I was born.\"",options:["which", "who", "where", "when"],answer:2,explanation:"先行詞が場所（the house）で、関係詞節内で副詞の役割をするので関係副詞 where を使う。"},
  {id:"g068",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I remember the day _____ we first met.\"",options:["which", "where", "when", "what"],answer:2,explanation:"先行詞が時（the day）で、関係詞節内で副詞の役割をするので関係副詞 when を使う。"},
  {id:"g069",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Tell me _____ you want.\"",options:["that", "which", "what", "who"],answer:2,explanation:"what は「〜こと／もの」という意味で先行詞を含む関係代名詞。Tell me what you want = Tell me the thing which you want。"},
  {id:"g070",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He has two sons, _____ are doctors.\"",options:["who", "that", "which", "both of whom"],answer:3,explanation:"非制限用法で「2人の息子がいて、両方とも医者」を表すには both of whom が適切。that は非制限用法では使えない。"},
  {id:"g071",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The reason _____ he was absent is unknown.\"",options:["which", "why", "what", "how"],answer:1,explanation:"先行詞が reason の場合、関係副詞 why を使う。"},
  {id:"g072",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ wants to come is welcome.\"",options:["Who", "Whoever", "Whom", "Whose"],answer:1,explanation:"whoever は「〜する人は誰でも」を意味する複合関係代名詞。anyone who と同じ。"},
  {id:"g073",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He is the kindest person _____ I've ever met.\"",options:["who", "whom", "that", "which"],answer:2,explanation:"先行詞に最上級がついている場合は関係代名詞 that が好まれる。"},
  {id:"g074",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She said nothing, _____ made me angry.\"",options:["that", "which", "who", "what"],answer:1,explanation:"前の文全体を先行詞とする非制限用法の which。「そのことが私を怒らせた」の意味。"},
  {id:"g075",category:"grammar",subcategory:"関係詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I'll give you _____ you need.\"",options:["that", "which", "whatever", "whomever"],answer:2,explanation:"whatever は「〜するものは何でも」を意味する複合関係代名詞。anything that と同じ。"},
  {id:"g076",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"This is _____ book I have ever read.\"",options:["interesting", "more interesting", "the most interesting", "the interesting"],answer:2,explanation:"「今まで読んだ中で最も面白い」という最上級表現。the most + 形容詞が適切。"},
  {id:"g077",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"He is _____ his brother.\"",options:["as tall as", "as taller as", "tall as", "as tall than"],answer:0,explanation:"as + 形容詞の原級 + as は「〜と同じくらい…」の意味。"},
  {id:"g078",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"Tokyo is much _____ than Miyazaki.\"",options:["big", "bigger", "the biggest", "more big"],answer:1,explanation:"much は比較級を強める副詞。「はるかに大きい」の意味で bigger を使う。"},
  {id:"g079",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"The _____ you study, the _____ you will learn.\"",options:["hard / much", "harder / more", "hardest / most", "more hard / more much"],answer:1,explanation:"The 比較級 ~, the 比較級 ... は「〜すればするほどますます…」の構文。"},
  {id:"g080",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"No other student in the class is _____ him.\"",options:["tall than", "taller than", "as taller as", "most tall"],answer:1,explanation:"No other + 単数名詞 + is + 比較級 + than は最上級を表す構文。"},
  {id:"g081",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"He is not _____ rich as he seems.\"",options:["as", "so", "more", "than"],answer:0,explanation:"not as/so ~ as で「〜ほど…ない」。どちらも使えるが as の方が一般的。"},
  {id:"g082",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"She speaks English _____ than her sister.\"",options:["good", "better", "best", "well"],answer:1,explanation:"well（副詞）の比較級は better。「姉よりも英語を上手に話す」の意味。"},
  {id:"g083",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"Which do you like _____, tea or coffee?\"",options:["well", "better", "best", "good"],answer:1,explanation:"2つのものの比較では比較級を使う。3つ以上なら best。"},
  {id:"g084",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"This bag is three times _____ as that one.\"",options:["as expensive", "expensive", "more expensive", "the most expensive"],answer:0,explanation:"倍数表現は 倍数 + as + 原級 + as の形。three times as expensive as で「3倍高い」。"},
  {id:"g085",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"He is _____ a teacher than a scholar.\"",options:["more", "rather", "most", "much"],answer:0,explanation:"more A than B は「B というよりむしろ A」の意味。2つの性質を比べる表現。"},
  {id:"g086",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"The population of Tokyo is much _____ than that of Miyazaki.\"",options:["large", "larger", "bigger", "more"],answer:1,explanation:"人口の大小は large/larger で表す。many/more は数える名詞に使う。"},
  {id:"g087",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"He is the tallest _____ all the students in his class.\"",options:["in", "of", "among", "at"],answer:1,explanation:"「〜の中で最も…」という最上級表現で、複数名詞（all the students）が続く場合は of を使う。"},
  {id:"g088",category:"grammar",subcategory:"比較",question:"空所に入る最も適切な語句を選べ。\n\n\"The more I read this book, the _____ it becomes.\"",options:["interesting", "more interesting", "most interesting", "the interesting"],answer:1,explanation:"The 比較級 ~, the 比較級 ... の構文。「読めば読むほどより面白くなる」の意味。"},
  {id:"g089",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I stayed home _____ it was raining.\"",options:["but", "because", "so", "although"],answer:1,explanation:"「雨が降っていたので家にいた」という理由を表すので because が適切。"},
  {id:"g090",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ it was raining, we went out.\"",options:["Because", "Although", "If", "When"],answer:1,explanation:"「雨が降っていたにもかかわらず出かけた」という譲歩を表すので although が適切。"},
  {id:"g091",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ you hurry, you will miss the train.\"",options:["If", "Unless", "Although", "Because"],answer:1,explanation:"unless は「〜しない限り／もし〜しなければ」の意味。if ~ not と同じ。"},
  {id:"g092",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He was so tired _____ he fell asleep.\"",options:["that", "as", "because", "when"],answer:0,explanation:"so ~ that ... は「非常に〜なので…」という結果を表す構文。"},
  {id:"g093",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I'll wait here _____ you come back.\"",options:["since", "until", "by", "while"],answer:1,explanation:"until は「〜するまで（動作・状態の継続）」を表す。by は期限（〜までに）。"},
  {id:"g094",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ he is rich, he is not happy.\"",options:["Because", "Though", "If", "When"],answer:1,explanation:"「金持ちだが幸せではない」という譲歩を表すので though が適切。"},
  {id:"g095",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ he comes, we will start the meeting.\"",options:["Until", "Unless", "As soon as", "While"],answer:2,explanation:"as soon as は「〜するとすぐに」の意味。"},
  {id:"g096",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Neither he _____ I am to blame.\"",options:["or", "nor", "and", "but"],answer:1,explanation:"neither A nor B で「A も B も〜ない」の意味。動詞は B に合わせる。"},
  {id:"g097",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Not only she _____ but her brother can play the piano.\"",options:["but", "and", "or", "nor"],answer:0,explanation:"not only A but (also) B で「A だけでなく B も」の意味。"},
  {id:"g098",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Hurry up, _____ you'll be late.\"",options:["and", "or", "but", "so"],answer:1,explanation:"命令文 + or ~ は「〜しなさい、さもないと…」の意味。命令文 + and は「そうすれば」。"},
  {id:"g099",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ as I know, he is honest.\"",options:["As far", "As long", "So long", "So much"],answer:0,explanation:"as far as I know は「私が知る限り」の意味。情報の範囲を限定する定型表現。"},
  {id:"g100",category:"grammar",subcategory:"接続詞",question:"空所に入る最も適切な語句を選べ。\n\n\"You can stay here _____ you are quiet.\"",options:["as far as", "as long as", "so that", "in case"],answer:1,explanation:"as long as は「〜する限り」で条件を表す。as far as は範囲・程度を表す。"},
  {id:"g101",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She was born _____ April 5, 1990.\"",options:["in", "on", "at", "by"],answer:1,explanation:"日付には on を使う。年・月だけなら in、時刻なら at。"},
  {id:"g102",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I'll be back _____ an hour.\"",options:["in", "on", "at", "by"],answer:0,explanation:"in + 時間 で「〜後に」の意味。by は「〜までに」で期限を表す。"},
  {id:"g103",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Please finish it _____ Monday.\"",options:["until", "by", "till", "at"],answer:1,explanation:"by は「〜までに（期限）」。until/till は「〜まで（継続）」。"},
  {id:"g104",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He is good _____ playing tennis.\"",options:["in", "at", "with", "on"],answer:1,explanation:"be good at ~ing で「〜が得意である」。定型表現。"},
  {id:"g105",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She is interested _____ Japanese culture.\"",options:["on", "in", "at", "with"],answer:1,explanation:"be interested in で「〜に興味がある」。"},
  {id:"g106",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He has been absent _____ school for three days.\"",options:["from", "of", "in", "at"],answer:0,explanation:"be absent from で「〜を欠席している」。"},
  {id:"g107",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She is afraid _____ dogs.\"",options:["for", "of", "from", "with"],answer:1,explanation:"be afraid of で「〜を恐れる」。"},
  {id:"g108",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I'm looking _____ my keys.\"",options:["at", "for", "after", "into"],answer:1,explanation:"look for は「〜を探す」。look at は「〜を見る」、look after は「〜の世話をする」。"},
  {id:"g109",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Please take care _____ yourself.\"",options:["for", "of", "with", "by"],answer:1,explanation:"take care of で「〜の世話をする」。"},
  {id:"g110",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He succeeded _____ passing the exam.\"",options:["to", "in", "at", "on"],answer:1,explanation:"succeed in で「〜に成功する」。"},
  {id:"g111",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She arrived _____ the airport at noon.\"",options:["to", "in", "at", "on"],answer:2,explanation:"arrive at + 狭い場所（駅・空港など）。arrive in + 広い場所（都市・国）。"},
  {id:"g112",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Thank you _____ your kindness.\"",options:["for", "to", "of", "about"],answer:0,explanation:"thank 人 for 事 で「（事）に対して（人）に感謝する」。"},
  {id:"g113",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The book is _____ the desk.\"",options:["at", "in", "on", "by"],answer:2,explanation:"on は面に接触していることを表す。机の上 = on the desk。"},
  {id:"g114",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This book is different _____ that one.\"",options:["from", "of", "in", "with"],answer:0,explanation:"be different from で「〜と異なる」。"},
  {id:"g115",category:"grammar",subcategory:"前置詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This table is made _____ wood.\"",options:["from", "of", "in", "with"],answer:1,explanation:"be made of は材料が見てわかるとき（物理的変化）。be made from は見てわからないとき（化学的変化）。"},
  {id:"g116",category:"grammar",subcategory:"名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I need some _____ to write with.\"",options:["paper", "papers", "a paper", "pen"],answer:3,explanation:"write with の with は道具を表すので、書く道具が必要。paper（紙）は書く対象で with は使わない。"},
  {id:"g117",category:"grammar",subcategory:"名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I have a lot of _____ to do.\"",options:["work", "works", "a work", "the work"],answer:0,explanation:"work（仕事）は不可算名詞。複数形の works は「作品」や「工場」の意味。"},
  {id:"g118",category:"grammar",subcategory:"名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The _____ of this university is 20,000.\"",options:["number of students", "number of student", "students' number", "numbers of students"],answer:0,explanation:"the number of + 複数名詞 で「〜の数」の意味。a number of（たくさんの）とは意味が異なる。"},
  {id:"g119",category:"grammar",subcategory:"名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Could you give me some _____?\"",options:["advice", "advices", "an advice", "the advices"],answer:0,explanation:"advice（助言）は不可算名詞。数えたいときは a piece of advice とする。"},
  {id:"g120",category:"grammar",subcategory:"名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ is the capital of Japan.\"",options:["A Tokyo", "The Tokyo", "Tokyo", "Tokyos"],answer:2,explanation:"固有名詞（都市名）には原則として冠詞をつけない。"},
  {id:"g121",category:"grammar",subcategory:"名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"There is some _____ in the glass.\"",options:["water", "waters", "a water", "the waters"],answer:0,explanation:"water（水）は不可算名詞。量を表すには some などを使う。"},
  {id:"g122",category:"grammar",subcategory:"冠詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Can you play _____ piano?\"",options:["/", "a", "an", "the"],answer:3,explanation:"楽器名には定冠詞 the を付ける。play the piano。スポーツは無冠詞（play tennis）。"},
  {id:"g123",category:"grammar",subcategory:"冠詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He goes to _____ school by bus.\"",options:["a", "the", "/", "an"],answer:2,explanation:"go to school（通学する）は目的を表し無冠詞。go to the school は「その学校に（特定の理由で）行く」。"},
  {id:"g124",category:"grammar",subcategory:"冠詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ sun rises in the east.\"",options:["A", "The", "/", "An"],answer:1,explanation:"天体（太陽・月）やユニークなものには the を付ける。"},
  {id:"g125",category:"grammar",subcategory:"冠詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I want to be _____ English teacher.\"",options:["a", "an", "the", "/"],answer:1,explanation:"English は母音で始まる単語なので an を使う。発音の母音で決まる。"},
  {id:"g126",category:"grammar",subcategory:"冠詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She plays _____ tennis every weekend.\"",options:["a", "the", "/", "an"],answer:2,explanation:"スポーツ名には冠詞を付けない。play tennis/soccer/baseball。"},
  {id:"g127",category:"grammar",subcategory:"冠詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I have _____ apple and _____ orange.\"",options:["a / a", "an / an", "a / an", "an / a"],answer:3,explanation:"apple は母音始まりなので an、orange も母音始まりなので an。※正解は \"an / an\" だが選択肢の配置に注意。an apple and an orange。"},
  {id:"g128",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This bag is _____.\"",options:["my", "mine", "me", "I"],answer:1,explanation:"所有代名詞 mine は「私のもの」の意味。be 動詞の補語になる。"},
  {id:"g129",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ is difficult to learn a foreign language.\"",options:["This", "That", "It", "There"],answer:2,explanation:"形式主語の it。真主語は to learn a foreign language。"},
  {id:"g130",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I have two brothers. One is a doctor, and _____ is a teacher.\"",options:["another", "other", "the other", "others"],answer:2,explanation:"2つのうちの「一方」を one、「もう一方」を the other で表す。"},
  {id:"g131",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"This camera is cheaper than _____ over there.\"",options:["that", "those", "this", "it"],answer:0,explanation:"前出の名詞の代わりで、単数の「もう一方のもの」を表すとき that を使う。"},
  {id:"g132",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Each of the students _____ his or her own desk.\"",options:["have", "has", "having", "had"],answer:1,explanation:"each は単数扱い。each of + 複数名詞 + 単数動詞。"},
  {id:"g133",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ of us was able to solve the problem.\"",options:["None", "Not", "No", "Nothing"],answer:0,explanation:"None of + 複数名詞／代名詞 で「誰も〜ない」の意味。"},
  {id:"g134",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Some people like coffee, while _____ prefer tea.\"",options:["other", "the other", "others", "another"],answer:2,explanation:"不特定の「他の人々」を表すには others（複数形）を使う。"},
  {id:"g135",category:"grammar",subcategory:"代名詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Do you know _____ in this town?\"",options:["somebody", "anybody", "nobody", "everybody"],answer:1,explanation:"疑問文では anybody を使うのが原則。somebody は肯定文で使う。"},
  {id:"g136",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She speaks English _____.\"",options:["fluent", "fluently", "fluence", "fluency"],answer:1,explanation:"動詞（speaks）を修飾するので副詞 fluently が適切。"},
  {id:"g137",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The baby is _____.\"",options:["asleep", "sleeping", "sleepy", "slept"],answer:0,explanation:"asleep は「眠っている」の意味。主語の状態を表す叙述用法の形容詞。"},
  {id:"g138",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I have _____ time to finish this.\"",options:["few", "a few", "little", "a little"],answer:2,explanation:"time は不可算名詞なので little/a little を使う。little は「ほとんどない」、a little は「少しある」。"},
  {id:"g139",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"There are _____ students in the class.\"",options:["much", "little", "a little", "many"],answer:3,explanation:"students は可算名詞（複数）なので many を使う。much は不可算名詞。"},
  {id:"g140",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"The news is too _____ to believe.\"",options:["surprising", "surprised", "to surprise", "surprise"],answer:0,explanation:"news は「人を驚かせる」のでing形容詞を使う。surprising。"},
  {id:"g141",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He _____ goes to bed before midnight.\"",options:["hard", "hardly", "rare", "rarely"],answer:3,explanation:"rarely は「めったに〜ない」の意味。hardly は「ほとんど〜ない」で意味が異なる。"},
  {id:"g142",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He studied _____ for the exam.\"",options:["hard", "hardly", "harder", "hardest"],answer:0,explanation:"hard は形容詞「難しい」、副詞「熱心に」の意味。hardly は「ほとんど〜ない」。"},
  {id:"g143",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He is _____ a kind person.\"",options:["so", "such", "very", "too"],answer:1,explanation:"such + a/an + 形容詞 + 名詞 の語順。so の場合は so + 形容詞 + a/an + 名詞。"},
  {id:"g144",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I _____ saw her at the station.\"",options:["yesterday", "last night", "ago", "just"],answer:3,explanation:"just は「ちょうど」の意味で動詞の直前に置く。他は文末に置く時の副詞。"},
  {id:"g145",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"I have _____ been to Paris.\"",options:["ago", "before", "already", "yet"],answer:2,explanation:"already は現在完了の肯定文で「すでに」の意味。yet は疑問文・否定文で使う。"},
  {id:"g146",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"There is _____ wrong with this computer.\"",options:["something", "anything", "nothing", "everything"],answer:0,explanation:"肯定文では something を使う。形容詞は -thing の後に置く（something wrong）。"},
  {id:"g147",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"She is _____ cleverer than her brother.\"",options:["very", "much", "so", "too"],answer:1,explanation:"比較級を強める副詞は much、far、even、still など。very は原級を強める。"},
  {id:"g148",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"He is _____ from being honest.\"",options:["far", "near", "much", "very"],answer:0,explanation:"far from + 名詞／動名詞 は「決して〜ではない」という強い否定の意味。"},
  {id:"g149",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"It is a _____ long story.\"",options:["pretty", "prettily", "preetie", "prettier"],answer:0,explanation:"pretty は副詞で「かなり」の意味もある。形容詞 long を修飾する。"},
  {id:"g150",category:"grammar",subcategory:"形容詞・副詞",question:"空所に入る最も適切な語句を選べ。\n\n\"Each _____ has his or her own opinion.\"",options:["student", "students", "of student", "the students"],answer:0,explanation:"each + 単数名詞 + 単数動詞 が基本。each student は単数扱い。"},
  {id:"g151",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"significant\"",options:["small", "important", "easy", "common"],answer:1,explanation:"significant は「重要な、意義深い」の意味。important とほぼ同義。"},
  {id:"g152",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"abandon\"",options:["accept", "give up", "continue", "hold"],answer:1,explanation:"abandon は「見捨てる、放棄する」の意味。give up に近い。"},
  {id:"g153",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"diligent\"",options:["lazy", "hardworking", "smart", "kind"],answer:1,explanation:"diligent は「勤勉な、真面目な」の意味。hardworking と同義。"},
  {id:"g154",category:"grammar",subcategory:"語彙",question:"次の語の反意語を選べ。\n\n\"optimistic\"",options:["happy", "pessimistic", "realistic", "cynical"],answer:1,explanation:"optimistic（楽観的な）の反意語は pessimistic（悲観的な）。"},
  {id:"g155",category:"grammar",subcategory:"語彙",question:"次の語の反意語を選べ。\n\n\"generous\"",options:["kind", "stingy", "friendly", "gentle"],answer:1,explanation:"generous（寛大な、気前の良い）の反意語は stingy（けちな）。"},
  {id:"g156",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"enormous\"",options:["tiny", "huge", "common", "rare"],answer:1,explanation:"enormous は「巨大な、莫大な」の意味。huge と同義。"},
  {id:"g157",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"obvious\"",options:["hidden", "clear", "doubtful", "vague"],answer:1,explanation:"obvious は「明白な、明らかな」の意味。clear と同義。"},
  {id:"g158",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"eventually\"",options:["never", "finally", "immediately", "sometimes"],answer:1,explanation:"eventually は「最終的に、結局」の意味。finally と同義。"},
  {id:"g159",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"regard\"",options:["forget", "consider", "refuse", "hate"],answer:1,explanation:"regard は「〜と見なす、考える」の意味。consider と同義。"},
  {id:"g160",category:"grammar",subcategory:"語彙",question:"次の語と意味が最も近いものを選べ。\n\n\"establish\"",options:["destroy", "set up", "avoid", "reduce"],answer:1,explanation:"establish は「設立する、確立する」の意味。set up と同義。"},
  {id:"g161",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"get along with\"",options:["〜と別れる", "〜と仲良くする", "〜を追い越す", "〜を軽視する"],answer:1,explanation:"get along with は「〜と仲良くやっていく」の意味。"},
  {id:"g162",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"put up with\"",options:["〜を建てる", "〜を我慢する", "〜を片付ける", "〜を持ち上げる"],answer:1,explanation:"put up with は「〜を我慢する、耐える」の意味。tolerate と同義。"},
  {id:"g163",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"look up to\"",options:["〜を軽蔑する", "〜を尊敬する", "〜を見上げる", "〜を調べる"],answer:1,explanation:"look up to は「〜を尊敬する」の意味。respect と同義。反対は look down on（軽蔑する）。"},
  {id:"g164",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"break down\"",options:["壊れる、故障する", "急いで出かける", "成功する", "決意する"],answer:0,explanation:"break down は「故障する」の意味。車や機械に使う。人に使うと「取り乱す、泣き崩れる」。"},
  {id:"g165",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"call off\"",options:["電話する", "呼び戻す", "中止する", "大声で呼ぶ"],answer:2,explanation:"call off は「（予定などを）中止する」の意味。cancel と同義。"},
  {id:"g166",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"come up with\"",options:["〜に追いつく", "〜を思いつく", "〜と一緒に来る", "〜をあきらめる"],answer:1,explanation:"come up with は「（アイデアなどを）思いつく」の意味。think of と同義。"},
  {id:"g167",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"figure out\"",options:["数字を書く", "理解する", "計算を間違える", "外見を整える"],answer:1,explanation:"figure out は「理解する、解明する」の意味。understand と同義。"},
  {id:"g168",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"look forward to\"",options:["先を見る", "〜を楽しみにする", "前方に進む", "〜を期待する"],answer:1,explanation:"look forward to の後ろは動名詞。「〜を楽しみに待つ」の意味。"},
  {id:"g169",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"make up for\"",options:["〜を作り出す", "〜を埋め合わせる", "〜を化粧する", "〜を覚えておく"],answer:1,explanation:"make up for は「〜を埋め合わせる、補う」の意味。compensate for と同義。"},
  {id:"g170",category:"grammar",subcategory:"イディオム",question:"次のイディオムの意味として最も適切なものを選べ。\n\n\"run out of\"",options:["〜から逃げ出す", "〜を使い果たす", "外へ走る", "〜を走り回る"],answer:1,explanation:"run out of は「〜を使い果たす」の意味。用意していたものがなくなることを表す。"},
  {id:"g171",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"It is _____ you who are responsible.\"",options:["who", "that", "whom", "which"],answer:1,explanation:"It is ~ that ... の強調構文。この場合 you を強調している。"},
  {id:"g172",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"Never _____ such a beautiful sunset.\"",options:["I saw", "have I seen", "I have seen", "did I saw"],answer:1,explanation:"Never のような否定語が文頭に出ると倒置が起こる。have I seen の語順になる。"},
  {id:"g173",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"Not until he was 30 _____ his career.\"",options:["he started", "did he start", "he had started", "started he"],answer:1,explanation:"Not until が文頭に出ると倒置。did he start の語順になる。"},
  {id:"g174",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"Hardly _____ the room when the phone rang.\"",options:["I had entered", "had I entered", "I entered", "did I enter"],answer:1,explanation:"Hardly が文頭に出ると倒置。Hardly had I entered ... when ~「〜するやいなや…した」の構文。"},
  {id:"g175",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"So tired _____ that he fell asleep immediately.\"",options:["he was", "was he", "did he", "had he"],answer:1,explanation:"So + 形容詞 + 動詞 + 主語 の倒置構文。強調のために so tired を文頭に置く。"},
  {id:"g176",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"There _____ a book and two pens on the desk.\"",options:["is", "are", "was", "were"],answer:0,explanation:"There is/are 構文では、動詞の直後の名詞（a book）に動詞を合わせる。"},
  {id:"g177",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"The more, the _____.\"",options:["better", "well", "good", "best"],answer:0,explanation:"The more, the better.「多ければ多いほどよい」という慣用表現。"},
  {id:"g178",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"Not only _____ English, but also Japanese.\"",options:["he speaks", "does he speak", "he is speaking", "speaks he"],answer:1,explanation:"Not only が文頭に出ると倒置。does he speak の語順。"},
  {id:"g179",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ the book may be, I will read it.\"",options:["However long", "How long", "Whatever", "So long"],answer:0,explanation:"However + 形容詞 + 主語 + may be は「いかに〜であろうとも」の譲歩構文。"},
  {id:"g180",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"The fact _____ he lied disappointed us.\"",options:["which", "that", "what", "when"],answer:1,explanation:"fact, idea, news などの抽象名詞の内容を説明する同格の that 節。"},
  {id:"g181",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"It was not until I came to Tokyo _____ I realized how big Japan is.\"",options:["when", "that", "which", "where"],answer:1,explanation:"It is not until ~ that ... 「〜して初めて…する」の強調構文。"},
  {id:"g182",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"_____ hard she tried, she couldn't solve the problem.\"",options:["How", "However", "Whatever", "Although"],answer:1,explanation:"However + 形容詞／副詞 + 主語 + 動詞 で「いかに〜しても」の譲歩を表す。"},
  {id:"g183",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"What do you say to _____ a walk?\"",options:["take", "taking", "took", "be taken"],answer:1,explanation:"What do you say to ~ing? は「〜するのはどう？」という提案表現。to の後は動名詞。"},
  {id:"g184",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"It goes without saying _____ health is above wealth.\"",options:["which", "what", "that", "how"],answer:2,explanation:"It goes without saying that ~ は「〜は言うまでもない」の慣用表現。"},
  {id:"g185",category:"grammar",subcategory:"構文",question:"空所に入る最も適切な語句を選べ。\n\n\"Chances are _____ she will come to the party.\"",options:["which", "that", "what", "why"],answer:1,explanation:"Chances are (that) ~ は「〜する見込みがある」の口語表現。"},
  {id:"g186",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"Please _____ me to send the email.\"",options:["remind", "remember", "forget", "recall"],answer:0,explanation:"remind 人 to do は「人に〜することを思い出させる」。remember to do は主語自身が覚えている。"},
  {id:"g187",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"I _____ him to come early.\"",options:["said", "told", "spoke", "talked"],answer:1,explanation:"tell 人 to do（人に〜するように言う）。say to 人 の形はあるが、say 人 to do は誤り。"},
  {id:"g188",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"He _____ me to wait.\"",options:["said", "told", "spoke", "talked"],answer:1,explanation:"tell 人 to do の形。told me to wait で「私に待つように言った」。"},
  {id:"g189",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"I'm _____ to meet you.\"",options:["please", "pleasing", "pleased", "pleasure"],answer:2,explanation:"I'm pleased to meet you. は「初めまして」という自己紹介の決まり文句。"},
  {id:"g190",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"He reminds me _____ my brother.\"",options:["on", "of", "to", "with"],answer:1,explanation:"remind 人 of 事 で「人に〜を思い出させる」。"},
  {id:"g191",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"He was accused _____ stealing the money.\"",options:["on", "of", "with", "for"],answer:1,explanation:"accuse 人 of 事 で「人を〜で非難する／告発する」。"},
  {id:"g192",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"She prevented me _____ going.\"",options:["to", "from", "of", "at"],answer:1,explanation:"prevent 人 from ~ing で「人が〜するのを妨げる」。"},
  {id:"g193",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"He provided us _____ food.\"",options:["to", "for", "with", "of"],answer:2,explanation:"provide 人 with 物 で「人に物を供給する」。provide 物 for 人 の形もある。"},
  {id:"g194",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"She robbed me _____ my bag.\"",options:["from", "of", "to", "with"],answer:1,explanation:"rob 人 of 物 で「人から物を奪う」。steal 物 from 人 とは異なる。"},
  {id:"g195",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"I congratulate you _____ your success.\"",options:["on", "for", "with", "at"],answer:0,explanation:"congratulate 人 on 事 で「人の〜を祝う」。"},
  {id:"g196",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"We must distinguish right _____ wrong.\"",options:["to", "from", "against", "with"],answer:1,explanation:"distinguish A from B で「A を B と区別する」。"},
  {id:"g197",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"He was deprived _____ all his rights.\"",options:["from", "of", "to", "with"],answer:1,explanation:"deprive 人 of 物 で「人から物を奪う」。受動態で be deprived of。"},
  {id:"g198",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"His success is attributed _____ hard work.\"",options:["to", "of", "from", "with"],answer:0,explanation:"attribute A to B で「A を B に帰する／B のおかげと考える」。"},
  {id:"g199",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"She is married _____ a doctor.\"",options:["with", "to", "of", "by"],answer:1,explanation:"be married to 人 で「人と結婚している」。get married to でも同じ。"},
  {id:"g200",category:"grammar",subcategory:"語法",question:"空所に入る最も適切な語句を選べ。\n\n\"The students in the class consist _____ boys and girls.\"",options:["in", "of", "with", "from"],answer:1,explanation:"consist of で「〜から成る」。be composed of / be made up of と同義。"},
  {id:"c001",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標の冒頭で示されている「働かせる」べきものとして正しいものを選べ。",options:["外国語の構造や規則に関する論理的思考力", "外国語によるコミュニケーションにおける見方・考え方", "国際社会で必要となる幅広い教養と国際感覚", "文脈に応じて適切な表現を選ぶ言語的直感"],answer:1,explanation:"教科目標は「外国語によるコミュニケーションにおける見方・考え方を働かせ」から始まる。これを通じて資質・能力を育成することが目指される。"},
  {id:"c002",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標に示された育成を目指す資質・能力の表現として正しいものを選べ。",options:["日常生活の様々な場面で幅広く対応できる高度な英語運用能力", "簡単な情報や考えなどを理解したり表現したり伝え合ったりするコミュニケーションを図る資質・能力", "母語話者と同等の水準で自由に意思疎通を行える言語運用能力", "学習内容を的確に理解し各種試験に適切に対応できる総合的な能力"],answer:1,explanation:"中学校段階の目標は「簡単な情報や考えなどを理解したり表現したり伝え合ったりするコミュニケーションを図る資質・能力」。小学校「基礎となる」、高校「的確に理解し適切に表現する」との段階性がある。"},
  {id:"c003",category:"guideline",subcategory:"教科目標",question:"中学校外国語科の教科目標は、どの言語活動を通じて資質・能力を育成するとしているか、正しい組み合わせを選べ。",options:["聞くこと・話すこと・読むこと・書くことの四技能を独立に扱う言語活動", "聞く・読む・話す・書くの言語活動およびこれらを結び付けた統合的な言語活動", "読むこと・書くことを中心にしつつ音声面も補助的に扱う言語活動", "相手との会話を中心にした即興的な口頭言語活動を重視する指導"],answer:1,explanation:"教科目標では「聞くこと，読むこと，話すこと，書くことの言語活動及びこれらを結び付けた統合的な言語活動を通して」と示されている。"},
  {id:"c004",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標(1)「知識及び技能」に含まれる要素として正しい組み合わせを選べ。",options:["音声・語彙・表現・文法・言語の働き", "音声・文字・語彙・表現・文法事項", "語彙・連語・慣用表現・発音・符号", "背景文化・語彙・文構造・言語の働き"],answer:0,explanation:"教科目標(1)は「外国語の音声や語彙，表現，文法，言語の働きなどを理解する」ことと「実際のコミュニケーションにおいて活用できる技能を身に付ける」ことを求める。"},
  {id:"c005",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標(2)「思考力・判断力・表現力等」が求める力として正しいものを選べ。",options:["場面や状況に応じた文法事項の正確な運用と分析を行う力", "コミュニケーションを行う目的や場面、状況などに応じて簡単な情報や考えなどを理解したり表現したり伝え合ったりする力", "日本語と英語の構造を比較しながら内容を正確に翻訳する力", "学習した語彙や表現を確実に記憶し即座に再生できる力"],answer:1,explanation:"目標(2)は「目的や場面，状況などに応じて，日常的な話題や社会的な話題について」理解・表現・伝え合う力を養うもの。"},
  {id:"c006",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標(3)「学びに向かう力、人間性等」の内容として正しい組み合わせを選べ。",options:["背景にある文化への理解／聞き手・読み手・話し手・書き手への配慮／主体的にコミュニケーションを図ろうとする態度", "文法事項の正確な運用／豊富な語彙の習得／積極的な発話態度", "場面に応じた読解力の育成／的確な翻訳力の習得／語彙力の拡充", "学習に取り組む意欲の向上／評価への前向きな姿勢／自己管理能力"],answer:0,explanation:"目標(3)は「外国語の背景にある文化に対する理解を深め，聞き手，読み手，話し手，書き手に配慮しながら，主体的に外国語を用いてコミュニケーションを図ろうとする態度を養う」。"},
  {id:"c007",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）が定める資質・能力の「三つの柱」として正しい組み合わせを選べ。",options:["知識および技能／思考力、判断力、表現力等／学びに向かう力、人間性等", "知識・理解／技能・表現／関心・意欲・態度の三つの観点", "聞くこと・読むこと／話すこと／書くことの三領域の能力", "言語知識／コミュニケーション能力／異文化理解の三つの柱"],answer:0,explanation:"今回の改訂では、すべての教科で「知識および技能」「思考力、判断力、表現力等」「学びに向かう力、人間性等」の三つの柱で目標が整理されている。"},
  {id:"c008",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）で目標が設定されている領域として正しい組み合わせを選べ。",options:["聞く／読む／話す［やり取り］／話す［発表］／書く", "聞くこと／話すこと／読むこと／書くことの四領域", "発音／聴解／読解／作文の四つの言語技能領域", "会話／音読／発表／作文の四つの表現領域"],answer:0,explanation:"今回の改訂で「話すこと」が［やり取り］と［発表］に分けられ、5領域となった。小・中・高で一貫した5領域目標が設定されている。"},
  {id:"c009",category:"guideline",subcategory:"5領域",question:"「話すこと」が2つに分けられたことに関する説明として正しいものを選べ。",options:["会話の速度や難易度に応じて段階別に二つに分けられた", "［やり取り］と［発表］に分けられ、それぞれ特性に応じた目標が設定された", "音読と自由発話という発話形態の違いに基づいて分けられた", "公的な場面と私的な場面という使用場面に応じて分けられた"],answer:1,explanation:"「話すこと」は、対話的・双方向的な［やり取り］と、一方向的・継続的な［発表］に分けられ、それぞれに特性に応じた目標が設定された。"},
  {id:"c010",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）の目標における5領域の記載順として正しいものを選べ。",options:["聞く→話す［やり取り］→話す［発表］→読む→書く", "聞く→読む→話す［やり取り］→話す［発表］→書く", "読む→聞く→書く→話す［やり取り］→話す［発表］", "話す［やり取り］→話す［発表］→聞く→読む→書く"],answer:1,explanation:"今回の改訂で従来の「聞く→話す→読む→書く」から「聞く→読む→話す［やり取り］→話す［発表］→書く」の順に変更された。"},
  {id:"c011",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「聞くこと」の目標アとして正しいものを選べ。",options:["自然な速度で話される講義や説明から主要な情報を正確に聞き取ることができるようにする", "はっきりと話されれば、日常的な話題について、必要な情報を聞き取ることができるようにする", "母語話者が標準的な速度で話す内容を細部まで正確に理解することができるようにする", "日常的な話題について話される英語を一度で完全に聞き取り再現することができるようにする"],answer:1,explanation:"目標アは「はっきりと話されれば、日常的な話題について、必要な情報を聞き取ることができるようにする」。"},
  {id:"c012",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「聞くこと」の目標イとして正しいものを選べ。",options:["日常的な話題について話される英語を母語並みの速度と精度で理解することができるようにする", "はっきりと話されれば、日常的な話題について、話の概要を捉えることができるようにする", "社会的な話題に関する専門的な講義を聞いて詳細な内容まで把握することができるようにする", "日常的な話題について話される英語から話し手の感情や意図を的確に聞き分けることができるようにする"],answer:1,explanation:"目標イは「はっきりと話されれば，日常的な話題について，話の概要を捉えることができるようにする」。"},
  {id:"c013",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「聞くこと」の目標ウとして正しいものを選べ。",options:["聞いた英語の内容を正確に書き取り、必要に応じて日本語で整理することができるようにする", "はっきりと話されれば、社会的な話題について、短い説明の要点を捉えることができるようにする", "日常的な話題について話される英語の内容を詳細まで記憶し要約することができるようにする", "社会的な話題に関する長い説明を聞いて、その内容を忠実に再現することができるようにする"],answer:1,explanation:"目標ウは「はっきりと話されれば，社会的な話題について，短い説明の要点を捉えることができるようにする」。"},
  {id:"c014",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「読むこと」の目標として該当するものを選べ。",options:["文学的な価値のある英文を読み、その表現や内容を鑑賞することができるようにする", "日常的な話題について、簡単な語句や文で書かれたものから必要な情報を読み取る/概要を捉える/要点を捉えることができるようにする", "社会的な話題について書かれた専門的な文章を読み、筆者の主張を詳細に分析できるようにする", "日常的な話題について書かれた英文を、意味を損なわないよう日本語に訳すことができるようにする"],answer:1,explanation:"「読むこと」の目標は、日常的話題から必要な情報の読み取り、概要把握、社会的話題の要点把握が中心。"},
  {id:"c015",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「話すこと［やり取り］」の目標として正しいものを選べ。",options:["社会的な話題について、根拠を示しながら議論や討論を行うことができるようにする", "関心のある事柄について、簡単な語句や文を用いて即興で伝え合うことができるようにする", "日常的な話題について、聞き手の関心を引く演説を構成して話すことができるようにする", "相手の発話を正確に聞き取り、内容を日本語で的確に伝えることができるようにする"],answer:1,explanation:"「話すこと［やり取り］」の目標では、即興で伝え合うことが重視されている。即興性は今回の改訂の重要ポイント。"},
  {id:"c016",category:"guideline",subcategory:"5領域",question:"「話すこと［やり取り］」に関連して、新学習指導要領で重視されるようになった能力として正しいものを選べ。",options:["定型表現を正確に記憶し場面に応じて再生できる能力", "即興で話す能力", "原稿を流暢に読み上げ聞き手に伝える能力", "相手の発話を日本語に訳して伝える能力"],answer:1,explanation:"「即興で」話す能力の育成が改訂のポイントの一つ。単に暗記した英文を話すのではなく、その場の状況に応じて話す力が求められる。"},
  {id:"c017",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「話すこと［発表］」の目標に含まれる内容として正しいものを選べ。",options:["自分で作成したメモなどを活用しながら話す", "事前に準備した原稿を正確に暗記してから話す", "場面に応じて適切な発音と抑揚で話すように指導する", "発表後に聞き手との質疑応答を必ず組み込んで話す"],answer:0,explanation:"「話すこと［発表］」では「自分で作成したメモなどを活用して話す」ことが示されており、暗誦ではなく話す力を重視。"},
  {id:"c018",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「書くこと」の目標として正しいものを選べ。",options:["自分の考えや意見を論理的に構成した長文のエッセイを書くことができるようにする", "関心のある事柄について、簡単な語句や文を用いてまとまりのある文章を書くことができるようにする", "読み手の興味を引く物語や創作文を構想して書き上げることができるようにする", "日本語で書かれた文章を自然な英語に訳して表現することができるようにする"],answer:1,explanation:"「書くこと」の目標では、簡単な語句や文を用いて「まとまりのある文章」を書く力の育成が示されている。"},
  {id:"c019",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）「書くこと」で示されている内容として正しいものを選べ。",options:["日常的な話題について、事実や自分の考え、気持ちなどを整理し、簡単な語句や文を用いてまとまりのある文章を書くことができるようにする", "聞いた内容を正確にノートに書き取り、要約してまとめることができるようにする", "日本語で書かれた文章を意味を損なわずに英語に訳すことができるようにする", "英語で書かれた文章を自然な日本語に直して内容を伝えられるようにする"],answer:0,explanation:"「書くこと」の目標には、自分の考えや気持ちを整理して簡単な文でまとまりのある文章を書く内容が含まれる。"},
  {id:"c020",category:"guideline",subcategory:"5領域",question:"5領域の目標が「～できるようにする」と書かれている趣旨として最も適切なものを選べ。",options:["指導の具体は各教員の判断と創意工夫に委ねられている", "生徒が実際に「～できる」状態（CAN-DO）になることを目指す", "学校が到達すべき参考程度の目安として示されている", "将来的に目指すべき理想像として設定されている"],answer:1,explanation:"目標は「～できるようにする」というCAN-DO形式で示されており、実際に行動として発揮できる状態を目指す。"},
  {id:"c021",category:"guideline",subcategory:"教科目標",question:"中学校外国語科の目標で「コミュニケーションを図る資質・能力」と表されているが、小学校外国語科の目標ではどう示されているか、正しいものを選べ。",options:["コミュニケーションを図る素地となる資質・能力", "コミュニケーションを図る基礎となる資質・能力", "コミュニケーションを図る資質・能力", "コミュニケーションを的確に図ることのできる資質・能力"],answer:1,explanation:"小学校外国語科は「基礎となる」、中学校は「資質・能力」、高校は「的確に理解し適切に表現するコミュニケーションを図る資質・能力」と段階化されている。"},
  {id:"c022",category:"guideline",subcategory:"教科目標",question:"中学校外国語科の目標が学習指導要領で示される際、何語の目標が示されているか。",options:["英語のみを対象として目標・内容が具体的に示されている", "英語とその他の外国語（英語以外の外国語は英語に準じる）", "国際的に使用されるすべての外国語について共通の目標が示されている", "英語と中国語など主要言語について個別に目標が示されている"],answer:1,explanation:"中学校では英語を履修させることが原則で、その他の外国語は英語の目標及び内容等に準じて行うとされている。"},
  {id:"c023",category:"guideline",subcategory:"教科目標",question:"中学校外国語科において英語を履修させることの扱いとして正しいものを選べ。",options:["生徒や地域の実態に応じて選択的に履修させることとする", "原則として英語を履修させる", "どの外国語も等しく扱い、学校の判断で履修させる", "英語以外の外国語の履修も積極的に推奨する"],answer:1,explanation:"第2の各言語において「外国語科においては，英語を履修させることを原則とする」と定められている。"},
  {id:"c024",category:"guideline",subcategory:"5領域",question:"中学校外国語科の5領域の目標で取り扱われる「話題」として正しい組み合わせを選べ。",options:["日常的な話題と社会的な話題", "学校生活に関する話題と専門的・学術的な話題", "我が国の伝統文化に関する話題と歴史的な話題", "国際理解に関する話題と職業・進路に関する話題"],answer:0,explanation:"5領域の目標には「日常的な話題」「社会的な話題」の両方が含まれる。中学校段階では日常的な話題が中心だが、社会的な話題も扱う。"},
  {id:"c025",category:"guideline",subcategory:"5領域",question:"「聞くこと」「読むこと」の目標における「必要な情報」「概要」「要点」の3つの理解のそれぞれの違いとして最も適切なものを選べ。",options:["発話や文章の音量や長さによって求められる理解の深さが異なる", "必要な情報（スキャニング的）・概要（大まかな内容）・要点（中心的な内容）と理解の焦点が異なる", "理解すべき内容の難易度や語彙レベルによって段階的に位置付けられている", "聞く・読む際に必要な時間や注意の配分の程度によって区別されている"],answer:1,explanation:"「必要な情報」は特定情報の聞き取り/読み取り、「概要」は全体的な大意、「要点」は重要な論点を捉えることを指す。"},
  {id:"c026",category:"guideline",subcategory:"5領域",question:"「話すこと［発表］」で「簡単な語句や文を用いて即興で」と示されない理由として最も適切なものを選べ。",options:["［発表］では準備の機会があるため、「自分で作成したメモなどを活用して話す」ことができる", "［発表］は生徒にとって難易度が高いため、即興性は求めないこととされている", "［発表］は聞き手との双方向性がないため、即興性の観点からは評価されない", "［発表］においても即興性は含まれるが、［やり取り］とは異なる形で示されている"],answer:0,explanation:"［やり取り］は即興性を強調する一方、［発表］はメモなどを活用した発表形式を想定している。"},
  {id:"c027",category:"guideline",subcategory:"教科目標",question:"中学校外国語科の教科目標における「コミュニケーションにおける見方・考え方」とは何か、最も適切なものを選べ。",options:["外国語で表現し伝え合う対象と、目的や場面、状況等に応じて情報を整理しながら考えなどを形成し、再構築すること", "文法事項を体系的に分析し、規則性を論理的に捉えて運用する視点・考え方", "語彙や表現を場面ごとに整理し、確実に記憶して再生できるようにする考え方", "日本語と外国語の違いに着目し、両言語の対応関係を捉えて表現する視点"],answer:0,explanation:"「見方・考え方」は、外国語で表現し伝え合う対象と、その目的・場面・状況等に応じて、情報を整理しながら考えなどを形成・再構築すること。"},
  {id:"c028",category:"guideline",subcategory:"教科目標",question:"教科目標の「他者に配慮しながら」の「他者」が具体的に何を指すか、最も適切なものを選べ。",options:["授業において生徒を指導する教員及び外国語指導助手", "聞き手、読み手、話し手、書き手", "生徒の学習を家庭で支える保護者や地域の方々", "同じ学級で学ぶ同級生や学習集団の仲間"],answer:1,explanation:"教科目標(3)は「聞き手，読み手，話し手，書き手に配慮しながら」と具体的に示されており、これが「他者」に該当する。"},
  {id:"c029",category:"guideline",subcategory:"教科目標",question:"教科目標における「主体的に外国語を用いてコミュニケーションを図ろうとする態度を養う」の意義として最も適切なものを選べ。",options:["高等学校進学や将来の入学者選抜に的確に対応する力を育てるため", "外国語学習の過程を通じて、生涯にわたって活用できる資質・能力として態度を育てる", "授業規律を守り、教員の指示に従って学習に取り組む態度を育てるため", "定期テスト等の評価場面で安定した結果を出すための学習習慣を育てるため"],answer:1,explanation:"この態度は「学びに向かう力、人間性等」に関わるもので、生涯にわたり外国語を通じて社会と関わっていく資質を養う。"},
  {id:"c030",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）の5領域の目標は、何に相当する形式で書かれているか、最も適切なものを選べ。",options:["学習の到達度を測定するための成績評価基準", "CAN-DO（～できるようにする）ディスクリプター", "定期テストの配点及び評定の基準となる観点", "各領域に配当すべき授業時間の配分の目安"],answer:1,explanation:"5領域の目標はすべて「～できるようにする」のCAN-DO形式で示され、各学校がCAN-DOリストを作成する際の基準となる。"},
  {id:"c031",category:"guideline",subcategory:"教科目標",question:"今回改訂の中学校外国語科の教科目標で、特に強化された観点として最も適切なものを選べ。",options:["日本語と英語の間で正確に意味を伝達する翻訳・通訳の能力", "コミュニケーションを行う目的や場面、状況などに応じた言語活動", "英文を自然な日本語に置き換えて内容を的確に伝える和訳の力", "中学校段階で定着させるべき文法事項の体系的な知識量"],answer:1,explanation:"新学習指導要領では「目的や場面，状況などに応じて」という観点が強調され、コミュニケーションの文脈を重視した言語活動が求められている。"},
  {id:"c032",category:"guideline",subcategory:"教科目標",question:"中学校外国語科の「三つの柱」は、何に基づいて設定されたか、最も適切なものを選べ。",options:["外国語科の特質を踏まえ、英語教育独自の観点から整理された資質・能力の枠組み", "中央教育審議会答申に基づき、すべての教科等で共通に整理された資質・能力の三つの柱", "国際的な言語能力評価の枠組みを参照し、我が国の学校教育に適応させた基準", "全国学力・学習状況調査など各種の試験における評価観点を整理したもの"],answer:1,explanation:"「三つの柱」は中央教育審議会答申（2016年）に基づき、すべての教科等で共通に整理された資質・能力の枠組み。"},
  {id:"c033",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）教科目標の構造として正しいものを選べ。",options:["前文（見方・考え方／言語活動／育成する資質・能力）＋(1)知識及び技能／(2)思考力、判断力、表現力等／(3)学びに向かう力、人間性等", "総則に続く序論と、領域別に記載された本論の二部で構成されている", "聞くこと・読むこと・話すこと・書くことの四技能を順に羅列した形式", "教科目標を簡潔にまとめた単独の目標文として一文で示されている"],answer:0,explanation:"教科目標は、前文で見方・考え方と言語活動を通じた資質・能力の育成を示し、(1)〜(3)で三つの柱に対応する具体を示す構造。"},
  {id:"c034",category:"guideline",subcategory:"5領域",question:"中学校学習指導要領（外国語）の5領域の目標のうち、「書くこと」で示される表現として正しいものを選べ。",options:["関心のある事柄について、簡単な語句や文を用いて正確に書くことができるようにする", "関心のある事柄について、簡単な語句や文を用いて即興で書くことができるようにする", "関心のある事柄について、簡単な語句や文を用いてまとまりのある文章を書くことができるようにする", "関心のある事柄について、自分の意見や主張を論理的に構成して書くことができるようにする"],answer:2,explanation:"「書くこと」の目標の一つに「関心のある事柄について，簡単な語句や文を用いてまとまりのある文章を書くことができるようにする」がある。"},
  {id:"c035",category:"guideline",subcategory:"5領域",question:"「書くこと」の目標に含まれる「事実や自分の考え、気持ちなどを整理し」の表現から読み取れる指導内容として最も適切なものを選べ。",options:["書く前にアイデアを整理する過程を重視する", "書かれた英文の語彙や文法の正確性を重視する", "限られた時間内で書き上げる処理速度を重視する", "筆記体や活字体など文字の書き方の習熟を重視する"],answer:0,explanation:"書く前に情報や考えを整理することが重要であり、プロセス・ライティング的な指導の考え方と一致する。"},
  {id:"c036",category:"guideline",subcategory:"5領域",question:"5領域の目標における「はっきりと話されれば」は何を意味するか、最も適切なものを選べ。",options:["母語話者が日常的な会話で用いる自然な速度での発話を想定", "ゆっくりとしてはっきりした発音での発話を想定", "通常の会話よりかなり遅く区切って話される発話を想定", "聞き取りやすいよう十分な音量で話される発話を想定"],answer:1,explanation:"「はっきりと話されれば」は、自然な速度よりやや配慮された明瞭な発話を想定した聞き取りの目標を示す。"},
  {id:"c037",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標における「実際のコミュニケーションにおいて活用できる技能」という表現の趣旨として最も適切なものを選べ。",options:["知識と技能を明確に分離して、それぞれを段階的に習得させる", "知識を単なる暗記で終わらせず、実際のコミュニケーション場面で活用できる状態にする", "筆記試験において安定した得点を取ることができる確かな学力を育てる", "音声面において標準的で正確な発音を身に付けられるようにする"],answer:1,explanation:"知識を「活用できる技能」として身に付けることが求められ、知識と技能の一体化と実際のコミュニケーションでの運用が重視されている。"},
  {id:"c038",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の目標における「思考力、判断力、表現力等」の育成で、特に重視される要素として最も適切なものを選べ。",options:["情報や考えの整理・論理的表現", "定着した言語材料の暗記量の拡大", "場面に応じた発音やイントネーションの精度", "中学校段階で使用できる語彙の総数"],answer:0,explanation:"「思考力、判断力、表現力等」の育成では、情報を整理しながら考えなどを形成し論理的に表現することが重視される。"},
  {id:"c039",category:"guideline",subcategory:"5領域",question:"「話すこと［やり取り］」の目標で「自分の考えや気持ちなどを伝え合うことができる」に含まれる具体的な内容として正しいものを選べ。",options:["日常的な話題について、事実や自分の考え、気持ちなどを整理し、簡単な語句や文を用いて伝え合うことができる", "身近な話題について、司会者として複数の参加者の発言を整理しながら進行できる", "社会的な話題について、根拠を示しながら立場を明確にして討論することができる", "関心のある事柄について、聞き手に分かりやすく情報を放送する形で伝えることができる"],answer:0,explanation:"「話すこと［やり取り］」のイの目標は、「日常的な話題について，事実や自分の考え，気持ちなどを整理し，簡単な語句や文を用いて伝え合うことができる」。"},
  {id:"c040",category:"guideline",subcategory:"5領域",question:"「話すこと［発表］」の目標で示される内容として正しい組み合わせを選べ。",options:["関心のある事柄について・日常的な話題について・社会的な話題について話すこと", "複数の参加者を前に司会進行を務めながら意見をまとめ発言すること", "社会的な話題について立場を定め、根拠を示しながら討論すること", "教科書や教材で学習した文章を正確に記憶し、流暢に再現すること"],answer:0,explanation:"「話すこと［発表］」は、関心のある事柄・日常的な話題・社会的な話題について自分の考え等を話す目標が設定されている。"},
  {id:"c041",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標全体として、何段階目の外国語学習に位置付けられているか。",options:["小学校での学習を経ていない生徒にとっての初期の学習段階", "小学校外国語科の次段階（中段階）", "義務教育における外国語学習の最終的な到達段階", "高等学校以降の高度な外国語学習への移行段階"],answer:1,explanation:"小学校外国語活動（中学年）→小学校外国語科（高学年）→中学校外国語科→高等学校外国語科という段階性の中で、中学校は中段階に位置する。"},
  {id:"c042",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標に、前回改訂（平成20年告示）から変化した大きなポイントとして最も適切なものを選べ。",options:["三つの柱に基づく目標構成と5領域化", "各学年における週当たりの授業時数の大幅な増加", "中学校段階で扱う語彙数の増加のみが行われた点", "外国語科から英語科へと教科名称が変更された点"],answer:0,explanation:"今回の改訂で目標が三つの柱に基づいて整理され、「話すこと」が［やり取り］と［発表］に分けられ4技能5領域となった。"},
  {id:"c043",category:"guideline",subcategory:"5領域",question:"「聞くこと」「読むこと」のような受容技能の目標で、「理解する」ではなく「捉える」「読み取る」などの動詞が使われている趣旨として最も適切なものを選べ。",options:["中学校段階における受容技能の難易度を抑え、容易さを強調するため", "生徒が能動的に意味内容を捉えようとする行動を示す", "聞いたり読んだりする活動は受動的な学習でよいことを示すため", "内容を日本語に置き換えて理解する過程を含むことを示すため"],answer:1,explanation:"「捉える」「読み取る」は、生徒が主体的に意味を構築する能動的な行為を示しており、受容技能も能動的なプロセスであることを示す。"},
  {id:"c044",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）で「外国語」と「英語」の関係はどう位置付けられているか、最も適切なものを選べ。",options:["教科名称としては外国語科と英語科は完全に同じ意味で用いられている", "外国語科の中で英語を履修することを原則とし、他の外国語は英語に準じる", "外国語科は英語以外の言語のみを扱う教科として位置付けられている", "外国語科は中国語や韓国語など近隣諸国の言語を中心に扱う教科である"],answer:1,explanation:"「外国語科においては，英語を履修させることを原則とする」とされ、他の外国語は英語の目標及び内容等に準じて行うとされている。"},
  {id:"c045",category:"guideline",subcategory:"5領域",question:"中学校外国語科の5領域の目標は、具体的にどのような形式で示されているか、最も適切なものを選べ。",options:["習熟度の段階を示す数値や指標によって目標が設定されている", "ア、イ、ウ等の項目ごとに「～できるようにする」の形式で複数示されている", "各領域について包括的な単一の目標文としてまとめて示されている", "指導すべき内容を解説した長文による説明文として示されている"],answer:1,explanation:"各領域ごとに3項目程度が「ア」「イ」「ウ」などで示され、すべて「～できるようにする」のCAN-DO形式で記述されている。"},
  {id:"c046",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標で「聞き手、読み手、話し手、書き手」の4者に配慮することが求められる趣旨として最も適切なものを選べ。",options:["相手に対する敬意を示すための丁寧な表現の使用を求めるため", "双方向的なコミュニケーションの相手を意識した表現能力の育成", "書かれた文章の読み手の立場を考慮した表現を重視するため", "発話する話し手の意図や立場を尊重した発信を重視するため"],answer:1,explanation:"「他者に配慮しながら」は、コミュニケーションの相手（受信者・発信者）を意識して表現する力を育てるための記述。"},
  {id:"c047",category:"guideline",subcategory:"5領域",question:"5領域の目標のうち、「話すこと［やり取り］」で即興性が特に強調される理由として最も適切なものを選べ。",options:["暗誦では実際のやり取りで機能しないため、リアルタイムな応答力が必要", "聞き手の立場に配慮した表現を選択できるようにするため", "場面や状況に応じた正確な発音を重視する指導のため", "話し言葉における文法事項の正確な運用を重視するため"],answer:0,explanation:"［やり取り］は相手との双方向的なコミュニケーションであり、相手の発話に応じてリアルタイムに応答する能力（即興性）が不可欠。"},
  {id:"c048",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）の教科目標(1)で示される「実際のコミュニケーションにおいて活用できる技能」について、最も適切な説明を選べ。",options:["技能とは自動化された運用能力を含む", "技能とはペーパーテストで客観的に測定可能な知識を指す", "技能とは英文を自然な日本語に置き換えて理解する力を指す", "技能とは音声面での聞き取り能力を中心とした受容的な力を指す"],answer:0,explanation:"ここでの「技能」は、習得した音声・語彙・表現・文法等の知識を、実際のコミュニケーション場面で活用できる、ある程度自動化された運用能力を指す。"},
  {id:"c049",category:"guideline",subcategory:"5領域",question:"5領域の目標で「簡単な語句や文」が頻出する理由として最も適切なものを選べ。",options:["中学校段階では基礎的・基本的な言語材料を用いた運用能力の育成が目指されるため", "生徒の学習負担を軽減するために平易さを強調する必要があるため", "中学校段階においては高度で複雑な表現の指導は想定されていないため", "各種学力調査や入学者選抜で求められる基礎的な力を定着させるため"],answer:0,explanation:"中学校段階の発達段階と学習内容に即して、基礎的・基本的な言語材料での運用能力の育成が目標とされている。"},
  {id:"c050",category:"guideline",subcategory:"教科目標",question:"中学校学習指導要領（外国語）が目指す生徒像として、教科目標全体から読み取れるものとして最も適切なものを選べ。",options:["外国語の知識を活用して主体的・対話的に他者とコミュニケーションを図り、文化理解と人格形成に資する生徒", "外国語を流暢に操り、母語話者と対等に議論できる高度な運用能力を持つ生徒", "四技能の試験で高得点を安定して取得し、進学実績に貢献できる生徒", "正確な発音と文法知識を身に付け、誤りなく英語を話せる生徒"],answer:0,explanation:"教科目標全体は、知識・技能の習得だけでなく、思考力等の育成、文化理解、主体的態度の涵養を含み、総合的な生徒像を目指す。"},
  {id:"c051",category:"guideline",subcategory:"内容・知識技能",question:"中学校学習指導要領（外国語）の「内容」の構成として正しいものを選べ。",options:["(1)知識及び技能／(2)思考力、判断力、表現力等／(3)言語活動及び言語の働きに関する事項", "(1)聞くこと／(2)話すこと／(3)読むこと／(4)書くことの領域ごと", "(1)語彙・連語・慣用表現／(2)文法事項／(3)音声・発音事項", "(1)小学校からの接続／(2)中学校の新規事項／(3)高校への発展"],answer:0,explanation:"「内容」は(1)知識及び技能、(2)思考力・判断力・表現力等、(3)言語活動及び言語の働きに関する事項、の3つで構成される。"},
  {id:"c052",category:"guideline",subcategory:"内容・知識技能",question:"中学校学習指導要領（外国語）の「内容」(1)「知識及び技能」に含まれる項目として正しい組み合わせを選べ。",options:["ア音声／イ符号／ウ語・連語・慣用表現／エ文・文構造・文法事項", "ア文字／イ文法事項／ウ語彙・表現／エ言語の働き", "ア発音・強勢／イ書字・綴り／ウ語彙／エ文構造", "ア聞くこと／イ話すこと／ウ読むこと／エ書くこと"],answer:0,explanation:"「知識及び技能」には、ア音声、イ符号、ウ語・連語・慣用表現、エ文、文構造及び文法事項、の4項目が含まれる。"},
  {id:"c053",category:"guideline",subcategory:"音声",question:"中学校学習指導要領（外国語）「音声」の指導内容として正しいものを選べ。",options:["現代の標準的な発音", "英語の歴史的変遷を踏まえた古典的な発音", "英語圏各地で用いられる地域的な発音", "母語話者と同等の水準を目指した発音"],answer:0,explanation:"「現代の標準的な発音」を指導することが示されており、過度に純粋な発音よりも実用的な発音が重視される。"},
  {id:"c054",category:"guideline",subcategory:"音声",question:"中学校学習指導要領（外国語）の「音声」で扱う項目として正しい組み合わせを選べ。",options:["現代の標準的な発音／語と語の連結による音の変化／語や句、文における基本的な強勢／文における基本的なイントネーション／文における基本的な区切り", "発音記号の読み方／語アクセントの位置／音節の区切り方の指導", "母音と子音の区別／個々の音素の明確な発音の習得", "英国式の発音と米国式の発音の違いに関する基本的な理解"],answer:0,explanation:"「音声」では5項目が示されている：(ア)現代の標準的な発音、(イ)語と語の連結による音の変化、(ウ)語や句、文における基本的な強勢、(エ)文における基本的なイントネーション、(オ)文における基本的な区切り。"},
  {id:"c055",category:"guideline",subcategory:"音声",question:"中学校学習指導要領（外国語）で扱う「語と語の連結による音の変化」に該当する具体例として最も適切なものを選べ。",options:["an appleがアナッポーに聞こえるような連結・脱落等", "英語圏の地域や方言による発音の違いによって生じる音の変化", "英語の歴史的変遷の中で起きた音韻体系の変化", "文中の強調される位置によるアクセントの移動現象"],answer:0,explanation:"音声連結（linking）・脱落・同化などにより、語と語が連結されて音が変化する現象。例：an apple, get it, what do you等。"},
  {id:"c056",category:"guideline",subcategory:"符号",question:"中学校学習指導要領（外国語）の「符号」の扱いとして正しいものを選べ。",options:["終止符、コンマ、疑問符、感嘆符、引用符などの符号", "辞書等で用いられる発音記号の読み方と活用", "国際音声記号を用いた音声の正確な表記", "学習ノートに用いる速記的な記号や略記法"],answer:0,explanation:"符号としては、終止符（.）、コンマ（,）、疑問符（?）、感嘆符（!）、引用符（\"\"）、アポストロフィ（'）、ハイフン（-）等の扱いが示される。"},
  {id:"c057",category:"guideline",subcategory:"符号",question:"新学習指導要領で「符号」に関して小学校から中学校の間で起きた変化として正しいものを選べ。",options:["基本的な符号は小学校外国語科に移行した", "符号は中学校段階で初めて扱うこととなった", "符号の指導は今回の改訂で扱わないこととなった", "符号は高校段階で本格的に扱うこととされた"],answer:0,explanation:"基本的な符号の扱いは小学校外国語科に移行し、中学校では小学校の学習を踏まえて指導する形になった。"},
  {id:"c058",category:"guideline",subcategory:"語・連語・慣用表現",question:"中学校学習指導要領（外国語）で扱う「語」の数として正しいものを選べ。",options:["小学校で学習した語に加えて800語程度の新語", "小学校で学習した語に加えて1200語程度の新語", "小学校で学習した600〜700語程度に1600〜1800語程度の新語", "小学校で学習した語に加えて2000〜2500語程度の新語"],answer:2,explanation:"中学校では「小学校で学習した語（600〜700語程度）に1600〜1800語程度の新語を加えた語」を扱う。合計で2200〜2500語程度。"},
  {id:"c059",category:"guideline",subcategory:"語・連語・慣用表現",question:"前回（平成20年告示）の中学校学習指導要領から今回の改訂で、中学校で扱う語彙数はどう変化したか、正しいものを選べ。",options:["1200語程度から1600〜1800語程度の新語に増加", "1200語程度のままで大きな変化はなかった", "1200語程度から1000語程度に減少した", "1200語程度から3000語以上に大幅に増加した"],answer:0,explanation:"前回改訂の1200語程度から、今回は1600〜1800語程度に増加した。小学校で先行して600〜700語を扱うことも背景にある。"},
  {id:"c060",category:"guideline",subcategory:"語・連語・慣用表現",question:"小学校で学習する語彙数として正しいものを選べ。",options:["200〜300語程度", "400〜500語程度", "600〜700語程度", "1000〜1200語程度"],answer:2,explanation:"小学校外国語科（5・6年生）で600〜700語程度の語を扱うこととされている。"},
  {id:"c061",category:"guideline",subcategory:"語・連語・慣用表現",question:"中学校学習指導要領（外国語）で「語」以外に扱うこととされている言語材料として正しい組み合わせを選べ。",options:["連語（eg, get up）、慣用表現（eg, How are you?）", "四字熟語に相当する英語の定型表現（eg, once in a while）", "英語圏で広く知られることわざや格言（eg, Time flies.）", "古典的な文学作品に用いられる古い英語表現"],answer:0,explanation:"指導要領では「語」だけでなく「連語」「慣用表現」を扱うことも明示され、実際のコミュニケーションで有用な定型表現を含む。"},
  {id:"c062",category:"guideline",subcategory:"語・連語・慣用表現",question:"中学校学習指導要領（外国語）における言語材料の学習の原則として正しいものを選べ。",options:["扱う言語材料はすべて受容語彙として意味理解できる水準にとどめて指導する", "生徒が受容するものと発信するものとがあることに留意して、指導に当たっては、発信することを重視", "扱う言語材料はすべて発信語彙として運用できる水準まで到達させるよう指導する", "言語材料は意味と用法を関連付けて定着させる暗記中心の指導を基本とする"],answer:1,explanation:"指導要領解説では、受容する言語材料と発信する言語材料を区別しつつ、発信できる言語材料の定着を重視した指導が示されている。"},
  {id:"c063",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）の「文、文構造及び文法事項」で扱う内容として最も適切な範囲を選べ。",options:["小学校で学習した事項を含めた中学校段階の文法事項", "高等学校で扱う文法事項の一部を先取りして扱う範囲", "大学入試や大学での学習に向けた発展的な文法事項", "古典的な文学作品に見られる文法事項を含む広い範囲"],answer:0,explanation:"中学校では、小学校で学習した事項を含めて整理された文法事項を扱う。文法事項は小学校から段階的に高度化される。"},
  {id:"c064",category:"guideline",subcategory:"文構造・文法",question:"今回の改訂で、中学校学習指導要領（外国語）に新たに加えられた文法事項として該当するものを選べ。",options:["現在完了進行形", "分詞構文の基本的な用法", "強調や疑問を表す倒置構文", "仮定法過去完了の基本的な形"],answer:0,explanation:"前回は高校で扱われていた「現在完了進行形」が中学校に移行された。他に「仮定法」の基本的なものなども中学校に移行。"},
  {id:"c065",category:"guideline",subcategory:"文構造・文法",question:"今回の改訂で中学校に新たに加えられた文法事項に含まれるものを選べ。",options:["主語＋動詞＋目的語＋原形不定詞", "時や理由を表す分詞構文の基本的な形", "否定語の文頭への移動による倒置構文", "場所を表す関係副詞 where の基本的な用法"],answer:0,explanation:"「主語＋動詞＋目的語＋原形不定詞」などの知覚・使役動詞構文、感嘆文のうち基本的なもの、仮定法の基本、現在完了進行形などが新たに中学校に加わった。"},
  {id:"c066",category:"guideline",subcategory:"文構造・文法",question:"今回の改訂で中学校に加わった「感嘆文」の扱いとして正しいものを選べ。",options:["基本的なもの（eg, What a beautiful day!）", "主語と動詞を含む複雑な構造の感嘆文", "文学作品に見られる修辞的な感嘆表現", "古典的な英語に見られる感嘆文の形式"],answer:0,explanation:"中学校では感嘆文のうち基本的なもの（What..., How...の形）を扱う。"},
  {id:"c067",category:"guideline",subcategory:"文構造・文法",question:"今回の改訂で中学校に加わった「仮定法」の扱いとして正しいものを選べ。",options:["基本的なもの（eg, If I were you..., I wish I could...）", "仮定法の用法を網羅的に扱うこととされている", "過去の事実に反する仮定を表す仮定法過去完了を中心に扱う", "If の省略による倒置を用いた仮定法の形式を扱う"],answer:0,explanation:"仮定法は「基本的なもの」に限定されており、If I were you..., I wish I could...などが想定される。"},
  {id:"c068",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う文構造として正しい組み合わせを選べ。",options:["主語＋動詞、主語＋動詞＋補語、主語＋動詞＋目的語、主語＋動詞＋間接目的語＋直接目的語、主語＋動詞＋目的語＋補語等", "主語＋動詞＋目的語＋補語＋補語などの複雑な文構造を含む", "主語＋動詞＋間接目的語＋直接目的語と、複文・重文を中心に扱う", "従属節を複数含む複合文の構造を中心的に扱う"],answer:0,explanation:"中学校では、SV、SVC、SVO、SVOO、SVOC などの基本文構造を扱う。"},
  {id:"c069",category:"guideline",subcategory:"文構造・文法",question:"文法事項の指導に関して、学習指導要領「内容の取扱い」で示された方針として最も適切なものを選べ。",options:["用語や用法の区別などの指導が中心とならないよう配慮する", "文法用語の定義を正確に理解させることを最優先に指導する", "文法事項を体系的にまとめた参考書の内容を記憶させる", "和訳と文法解説を組み合わせて構造を明示的に教える"],answer:0,explanation:"内容の取扱いにおいて「用語や用法の区別などの指導が中心とならないよう配慮し，実際に活用できるように指導すること」と明記されている。"},
  {id:"c070",category:"guideline",subcategory:"文構造・文法",question:"「文法はコミュニケーションを支えるものである」という位置付けに基づく指導のあり方として最も適切なものを選べ。",options:["言語活動と効果的に関連付けて指導すること", "言語活動とは切り離して文法事項を体系的に指導すること", "文法事項の定着のために反復的な暗記練習を徹底させること", "生徒が自律的に学習できるよう文法書を活用させること"],answer:0,explanation:"「文法については，コミュニケーションを支えるものであることを踏まえ，言語活動と効果的に関連付けて指導すること」と示されている。"},
  {id:"c071",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で、文法指導で留意すべき点として正しいものを選べ。",options:["語順や修飾関係などにおける日本語との違いに留意して指導する", "日本語との対比は混乱を招くため扱わないこととする", "日本語と英語を共通の構造として捉えて指導することとする", "指導に必要なすべての文法用語を体系的に記憶させる"],answer:0,explanation:"「語順や修飾関係などにおける日本語との違いに留意して指導すること」と指導要領「内容の取扱い」に示されている。"},
  {id:"c072",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）における文法事項の扱いとして最も適切なものを選べ。",options:["関連のある文法事項はまとまりをもって整理するなど、効果的な指導ができるよう工夫する", "文法事項は項目ごとに独立した単元として順に扱うこととする", "学習指導要領に示された語順に従って文法書の順序で指導する", "高等学校の文法指導との接続を意識し高校の教材に準拠する"],answer:0,explanation:"「英語の特質を理解させるために，関連のある文法事項はまとまりをもって整理するなど，効果的な指導ができるよう工夫すること」と示される。"},
  {id:"c073",category:"guideline",subcategory:"文構造・文法",question:"文法事項の指導で、「意味のある文脈でのコミュニケーションの中で繰り返し触れる」という記述の趣旨として最も適切なものを選べ。",options:["文脈の中で繰り返し出会うことで、文法事項の定着を図る", "例文を繰り返し音読し暗唱することで文法事項を定着させる", "訳読を通じて文構造を意識させ文法事項の理解を徹底する", "パターン・プラクティス等の反復ドリルによって自動化を図る"],answer:0,explanation:"言語材料は意味のある文脈での繰り返しを通じて習得されるという考え方に基づく。"},
  {id:"c074",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）における文法事項の指導に関して、生徒に促すべきものとして最も適切なものを選べ。",options:["文法事項の規則性や構造などについての気付き", "文法用語の定義と相互関係の体系的な理解", "代表例文を正確に記憶し即座に再生する能力", "参考書や文法書を自力で精読し内容を把握する力"],answer:0,explanation:"「その知識を活用させたり，繰り返し使用することで当該文法事項の規則性や構造などについて気付きを促したりする」ことが求められる。"},
  {id:"c075",category:"guideline",subcategory:"音声",question:"「音声」指導における具体的な項目「文における基本的なイントネーション」に含まれる例として最も適切なものを選べ。",options:["平叙文・疑問文・感嘆文等の文のタイプに応じたイントネーション", "詩や韻文の朗読に用いられる文学的なイントネーション", "英語の歌唱における旋律に沿ったイントネーション", "英語圏の地域によって異なる方言的なイントネーション"],answer:0,explanation:"文のタイプ（平叙文、Yes/No疑問文、Wh疑問文、感嘆文、選択疑問文等）による基本的なイントネーションの違いを扱う。"},
  {id:"c076",category:"guideline",subcategory:"音声",question:"「音声」指導における「文における基本的な区切り」の例として最も適切なものを選べ。",options:["意味の切れ目や文中のポーズ", "強調したい箇所における音量の変化による区切り", "話す速度の緩急によって生じる発話の区切り", "文中における個々の単語と単語の間の区切り"],answer:0,explanation:"文の中で意味のまとまりごとにポーズを置き、聞き手に理解しやすい話し方を学ぶ項目。"},
  {id:"c077",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う「(エ)動詞の時制など」に含まれる内容として正しい組み合わせを選べ。",options:["現在形、過去形、現在進行形、過去進行形、現在完了形、現在完了進行形、助動詞などを用いた未来表現", "過去完了形、未来完了形、完了進行形を中心とした時制", "仮定法過去完了や倒置構文を含む時制に関わる事項", "分詞構文や独立分詞構文を含む時制・相に関わる事項"],answer:0,explanation:"「動詞の時制など」では、現在形・過去形・進行形・現在完了形・現在完了進行形・助動詞を用いた未来表現などが扱われる。"},
  {id:"c078",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う助動詞の内容として最も適切なものを選べ。",options:["can, may, must, should, will, would などの基本的助動詞", "ought to, need, dare などを中心とした助動詞", "未来や意志を表す will と shall を中心とした助動詞", "助動詞は独立した文法事項としては扱わない"],answer:0,explanation:"can, may, must, should, will, would など基本的な助動詞が扱われる。"},
  {id:"c079",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う名詞・代名詞の内容として最も適切なものを選べ。",options:["冠詞、人称代名詞、指示代名詞、疑問代名詞、所有代名詞、再帰代名詞、不定代名詞、関係代名詞などを含む", "人名や地名などの固有名詞を中心とした指導を行う", "可算・不可算の区別を含む普通名詞を中心に扱う", "概念や性質を表す抽象名詞を中心に扱うこととする"],answer:0,explanation:"名詞・代名詞関連では、冠詞、各種代名詞（人称・指示・疑問・所有・再帰・不定・関係）などが扱われる。"},
  {id:"c080",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う不定詞の用法として正しい組み合わせを選べ。",options:["名詞的用法、形容詞的用法、副詞的用法の基本的なもの、原形不定詞（主語＋動詞＋目的語＋原形不定詞）", "動詞の目的語や補語となる名詞的用法を中心に扱う", "目的や結果、原因などを表す副詞的用法を中心に扱う", "動名詞や分詞との比較を通じて不定詞の用法を扱う"],answer:0,explanation:"不定詞は、名詞的・形容詞的・副詞的用法の基本と、今回改訂で加わった原形不定詞を伴う構文が含まれる。"},
  {id:"c081",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う関係詞の扱いとして正しいものを選べ。",options:["関係代名詞の制限用法（who, which, that, whose）", "コンマを伴う関係代名詞の非制限用法を中心に扱う", "場所や時、理由を表す関係副詞を中心に扱う", "whoever, whatever などの複合関係詞を扱う"],answer:0,explanation:"関係代名詞の制限用法（who, which, that, whose）などが中学校で扱われる。非制限用法は高校で本格的に扱う。"},
  {id:"c082",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う接続詞として最も適切な範囲を選べ。",options:["等位接続詞（and, but, or）および従属接続詞（because, when, if, that等）の基本的なもの", "語と語、句と句をつなぐ等位接続詞 and を中心に扱う", "理由を表す従属接続詞 because を中心に扱うこととする", "文学作品に見られる高度な接続表現を中心に扱う"],answer:0,explanation:"中学校では、等位接続詞と従属接続詞の基本的なものが扱われる。"},
  {id:"c083",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う前置詞の扱いとして正しいものを選べ。",options:["基本的な前置詞を扱う", "英語で用いられる前置詞を網羅的に扱うこととする", "時や場所を表す in, on, at のみに限定して扱う", "前置詞は独立した文法項目としては扱わない"],answer:0,explanation:"中学校では、位置・時間・手段・目的などを表す基本的な前置詞が扱われる。"},
  {id:"c084",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う受動態について最も適切な内容を選べ。",options:["受動態の基本的なもの（be動詞＋過去分詞）を扱う", "受動態の各用法を時制や助動詞との組合せも含め網羅的に扱う", "have been＋過去分詞で表される完了形の受動態を中心に扱う", "受動態は高等学校で扱うため中学校では扱わないこととする"],answer:0,explanation:"中学校では受動態の基本的な形と意味・用法を扱う。"},
  {id:"c085",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う分詞について最も適切な内容を選べ。",options:["現在分詞および過去分詞の基本的な用法（限定用法・叙述用法の基本）", "時や理由、条件を表す分詞構文を中心に扱う", "主節と異なる主語を持つ独立分詞構文を扱う", "副詞的に文全体を修飾する分詞の用法を中心に扱う"],answer:0,explanation:"中学校では分詞の基本的用法（名詞修飾・補語）が扱われ、分詞構文は高校で本格的に扱う。"},
  {id:"c086",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う動名詞について最も適切な内容を選べ。",options:["動名詞の基本的な用法（主語・目的語・補語・前置詞の目的語）", "動名詞は分詞と紛らわしいため中学校では扱わない", "having＋過去分詞で表される完了動名詞を中心に扱う", "It is no use doing などの動名詞を含む構文を中心に扱う"],answer:0,explanation:"動名詞の基本的な用法が扱われ、主語・目的語・補語・前置詞の目的語などの機能を扱う。"},
  {id:"c087",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う比較について正しい組み合わせを選べ。",options:["原級比較、比較級、最上級の基本的なもの", "the -est や most を用いた最上級を中心に扱う", "-er や more を用いた比較級を中心に扱うこととする", "twice as ... as など倍数を表す比較表現を中心に扱う"],answer:0,explanation:"中学校では、原級（as〜as）、比較級（-er/more）、最上級（-est/most）の基本的な比較表現を扱う。"},
  {id:"c088",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う「文」の種類として正しい組み合わせを選べ。",options:["平叙文、疑問文、命令文、感嘆文", "肯定文と否定文を中心とした平叙文を扱う", "Yes/No疑問文とWh疑問文を中心に扱う", "What型・How型の感嘆文を中心に扱う"],answer:0,explanation:"文の種類として、平叙文（肯定・否定）、疑問文（Yes/No・Wh・選択・付加疑問等）、命令文、感嘆文（基本的なもの）が扱われる。"},
  {id:"c089",category:"guideline",subcategory:"文構造・文法",question:"今回の改訂で、中学校に移行された文法事項の一つに「仮定法」があるが、その背景として最も適切なものを選べ。",options:["小・中・高の接続を重視し、段階的に高度な表現を扱うため", "全国学力・学習状況調査における試験範囲の拡大に対応するため", "英語で書かれた文学作品を理解する力を早期に育てるため", "中学校卒業時に母語話者並みの表現力を身に付けさせるため"],answer:0,explanation:"小・中・高の一貫した学習内容の段階化のため、従来高校で扱われた内容の一部が中学校に移行された。"},
  {id:"c090",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う「意味を理解できるように指導すべき事項」と「表現できるように指導すべき事項」の区別に関する説明として最も適切なものを選べ。",options:["言語材料の一部は受容的理解にとどめ、発信まで求めないものもある", "扱うすべての言語材料を発信できる水準まで定着させることとする", "発信することを重視するため意味理解の段階は省略してよい", "受容と発信の区別なくすべての言語材料を暗記させることとする"],answer:0,explanation:"すべての言語材料を同じレベルで運用する必要はなく、受容的理解でよいものと、発信まで求めるものの区別がある。"},
  {id:"c091",category:"guideline",subcategory:"内容・知識技能",question:"中学校学習指導要領（外国語）解説における「知識及び技能」の説明として最も適切なものを選べ。",options:["ただの暗記ではなく、実際のコミュニケーションで使える活用可能な状態を目指す", "中学校段階で定着させるべき文法事項の暗記量を示すもの", "英文を自然な日本語に置き換えて理解する和訳の正確さを指す", "音声面における標準的な発音の習得を中心に位置付けたもの"],answer:0,explanation:"「知識及び技能」は、単なる暗記で終わらせず、コミュニケーションで実際に活用できる技能の習得を目指す。"},
  {id:"c092",category:"guideline",subcategory:"符号",question:"中学校学習指導要領（外国語）で扱う符号の学習目的として最も適切なものを選べ。",options:["書き手・話し手の意図を理解したり表現したりするため", "英文の視覚的な読みやすさや体裁を整えるため", "文章に装飾的な効果を加え豊かな表現を可能にするため", "試験等で求められる書式を身に付けられるようにするため"],answer:0,explanation:"符号は、書き手の意図を理解したり自分の意図を表現したりする上で重要な役割を果たすため、正しい使用が求められる。"},
  {id:"c093",category:"guideline",subcategory:"音声",question:"音声指導における「強勢（アクセント）」の扱いとして正しいものを選べ。",options:["語における強勢（語アクセント）と句・文における強勢（文強勢）の両方を扱う", "語の中で置かれる語アクセントの位置を中心に扱う", "文の中で強調される語の文強勢を中心に扱う", "強勢は個々の生徒の発音習慣に委ねて扱わない"],answer:0,explanation:"「語や句，文における基本的な強勢」として、語レベルと句・文レベルの両方の強勢が扱われる。"},
  {id:"c094",category:"guideline",subcategory:"語・連語・慣用表現",question:"中学校学習指導要領（外国語）解説で、「連語」の例として示される種類に含まれるものを選べ。",options:["動詞＋副詞（get up）、動詞＋前置詞（look at）、動詞＋名詞（have breakfast）など", "漢語に由来する四字熟語に対応する英語の固定表現", "英語圏で広く知られる教訓的なことわざや格言", "古典的な文学作品に由来する慣用的な古い表現"],answer:0,explanation:"連語には、動詞と副詞・前置詞・名詞などの組み合わせによるもの（いわゆる句動詞やコロケーション）が含まれる。"},
  {id:"c095",category:"guideline",subcategory:"語・連語・慣用表現",question:"中学校学習指導要領（外国語）解説で、「慣用表現」の例として示されるものを選べ。",options:["How are you? / Thank you. / You are welcome. など定型的な表現", "四字熟語に類する英語の固定的な比喩表現", "教訓や経験に基づくことわざや格言的な表現", "文学作品に見られる詩的で修辞的な表現"],answer:0,explanation:"慣用表現は、あいさつ、感謝、謝罪などコミュニケーション場面で定型的に用いられる表現を指す。"},
  {id:"c096",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う疑問文の種類として正しい組み合わせを選べ。",options:["Yes/No疑問文、Wh疑問文、選択疑問文、付加疑問文、間接疑問文など", "疑問詞を用いて情報を尋ねるWh疑問文を中心に扱う", "肯定・否定で答えるYes/No疑問文を中心に扱う", "文中に埋め込まれた間接疑問文を中心に扱う"],answer:0,explanation:"疑問文は複数の種類を扱い、直接疑問文と間接疑問文、各種特殊疑問文を含む。"},
  {id:"c097",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う「to不定詞」と「動名詞」を目的語にとる動詞の違いに関する学習として最も適切な扱いを選べ。",options:["実際の使用を通じて、動詞ごとの特性に気付くよう指導する", "to不定詞・動名詞を取る動詞を一覧にして記憶させる", "個々の動詞の語法を辞書で逐一確認しながら学ばせる", "例文の和訳を通じて動詞と目的語の関係を理解させる"],answer:0,explanation:"実際の使用例を通じて、hope to do, enjoy doing のような動詞ごとの特性に気付かせる指導が望ましい。"},
  {id:"c098",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う接続詞の「従属接続詞」の例として正しいものを選べ。",options:["because, when, if, that, while, since, as, though", "and, but, or などの基本的な等位接続詞", "for, so などの理由や結果を表す等位接続詞", "yet, nor などの対比や否定を表す等位接続詞"],answer:0,explanation:"従属接続詞は、because（理由）、when（時）、if（条件）、that（名詞節）、while（時・対比）などが代表的。"},
  {id:"c099",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）で扱う命令文の基本形として最も適切なものを選べ。",options:["動詞の原形で始まる文、please を伴う命令文、Let's 〜、否定命令文（Don't 〜）", "Will you ... ? のように疑問文の形式を用いた命令表現を中心に扱う", "What a ... ! / How ... ! などの感嘆文形式を用いた命令表現を扱う", "Don't 〜 や Never 〜 などの否定命令文を中心に扱う"],answer:0,explanation:"命令文は、動詞の原形で始まる基本形、please 付き、Let's 〜（勧誘）、Don't 〜（否定命令）などが扱われる。"},
  {id:"c100",category:"guideline",subcategory:"文構造・文法",question:"中学校学習指導要領（外国語）において文法指導の到達目標として最も適切なものを選べ。",options:["実際のコミュニケーションで活用できるようにすること", "文法事項について用語や用法の区別が正確にできるようにすること", "学習した文法用語の定義を体系的に記憶できるようにすること", "参考書や文法書の内容を自力で読み解くことができるようにすること"],answer:0,explanation:"文法指導の到達目標は、実際のコミュニケーションで活用できる状態であり、用語・用法の区別の指導が中心とならないよう配慮する。"},
  {id:"c101",category:"guideline",subcategory:"思考力等",question:"中学校学習指導要領（外国語）「内容」(2)「思考力、判断力、表現力等」に示されている内容として正しいものを選べ。",options:["情報を整理しながら考えなどを形成し、英語で表現したり、伝え合ったりすることに関する事項", "中学校段階で定着させるべき文法事項を領域別にまとめたもの", "現代の標準的な発音に関する音声事項を体系的に整理したもの", "中学校で扱う語・連語・慣用表現を分類したリスト"],answer:0,explanation:"(2)は「情報を整理しながら考えなどを形成し，英語で表現したり，伝え合ったりすることに関する事項」として、5領域別に具体的活動内容が示されている。"},
  {id:"c102",category:"guideline",subcategory:"思考力等",question:"中学校学習指導要領（外国語）(2)の設定意図として最も適切なものを選べ。",options:["具体的な課題等を設定し、コミュニケーションを行う目的や場面、状況などに応じて、情報を整理しながら考えなどを形成し、これらを論理的に表現する活動", "学習した文法事項を定着させるための体系的な練習を行う機会を設ける意図", "中学校段階で扱う語彙・表現の定着を目的とした反復活動を位置付ける意図", "英語で得た情報を日本語で的確に伝える翻訳能力を育成する意図"],answer:0,explanation:"内容(2)の冒頭で「具体的な課題等を設定し，コミュニケーションを行う目的や場面，状況などに応じて，情報を整理しながら考えなどを形成し，これらを論理的に表現することを通して」と明示されている。"},
  {id:"c103",category:"guideline",subcategory:"思考力等",question:"中学校学習指導要領（外国語）(2)のアに含まれる内容として正しいものを選べ。",options:["日常的な話題や社会的な話題について、英語を聞いたり読んだりして必要な情報や考えなどを捉えること", "聞いたり読んだりした英文の構造を文法的に分析し、規則性を理解すること", "未知の語句について辞書を活用して意味や用法を調べ、理解を深めること", "聞いたり読んだりした内容を正確な日本語に置き換えて表現すること"],answer:0,explanation:"(2)アは「日常的な話題や社会的な話題について，英語を聞いたり読んだりして必要な情報や考えなどを捉えること」という受容系の思考・判断・表現の事項。"},
  {id:"c104",category:"guideline",subcategory:"思考力等",question:"中学校学習指導要領（外国語）(2)のイに含まれる内容として正しいものを選べ。",options:["日常的な話題や社会的な話題について、英語で話したり書いたりして自分の考えや気持ちなどを伝えること", "学習した文法事項を場面に応じて正確に用いる練習を行うこと", "語彙や表現を繰り返し練習することで確実に記憶し定着させること", "定型的な表現を反復して練習し、即座に再生できるようにすること"],answer:0,explanation:"(2)イは「日常的な話題や社会的な話題について，英語で話したり書いたりして自分の考えや気持ちなどを伝えること」という発信系の事項。"},
  {id:"c105",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）の「言語活動」の定義として最も適切なものを選べ。",options:["実際に英語を用いて互いの考えや気持ちを伝え合うなどの活動", "文法事項の規則性を定着させるための構造化された練習活動", "現代の標準的な発音の習得を目指した音声面の練習活動", "中学校段階で扱う語彙を確実に定着させるための学習活動"],answer:0,explanation:"「言語活動」とは、実際のコミュニケーションを目的として、英語を使って考えや気持ちを伝え合うなどの意味のある活動を指す。"},
  {id:"c106",category:"guideline",subcategory:"言語活動",question:"学習指導要領（外国語）解説で「言語活動」と「練習」はどのように区別されているか、最も適切な説明を選べ。",options:["言語活動は目的・場面・状況の伴う意味のある活動であり、形式的な練習とは区別される", "言語活動と練習はどちらも英語を用いる学習であり同義として扱われる", "言語活動とは文法事項の定着を目的とした構造化された練習を指す", "言語活動とは語彙や表現を確実に記憶するための暗記中心の活動を指す"],answer:0,explanation:"言語活動は「目的・場面・状況」を伴う意味のある活動であり、形式的な反復ドリル等の練習とは区別される。"},
  {id:"c107",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）における「統合的な言語活動」の説明として最も適切なものを選べ。",options:["聞く・読む・話す［やり取り］・話す［発表］・書くの複数領域を結び付けて行う活動", "学習した英文の暗記とその日本語訳を一体的に扱う統合的な活動", "文法事項の指導と語彙の指導を関連付けて一体的に行う活動", "音声面の学習と聞き取りの活動を関連付けて一体的に行う活動"],answer:0,explanation:"「統合的な言語活動」は、複数の領域を結び付けて行う活動であり、実際のコミュニケーションに近い形を目指す。"},
  {id:"c108",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）「(3)言語活動及び言語の働きに関する事項」で、5領域ごとに示されているものを選べ。",options:["領域ごとに具体的な言語活動例が示されている", "領域ごとに評価すべき観点と到達基準が示されている", "言語活動の成果を評価する際の採点方法が示されている", "定期テスト等で出題する問題の具体例が示されている"],answer:0,explanation:"(3)では、聞く・読む・話す［やり取り］・話す［発表］・書くの各領域ごとに具体的な言語活動例が示される。"},
  {id:"c109",category:"guideline",subcategory:"言語活動",question:"「聞くこと」の言語活動例として中学校学習指導要領（外国語）に示されているものを選べ。",options:["日常的な話題について、自然な速さで話される英語を聞いて、話し手の意向を正確に把握する活動", "聞いた英文を正確な日本語に訳して内容を詳細に伝える活動", "聞いた英文の構造を文法的に分析し規則性に気付く活動", "聞いた英文に含まれる未知語を抜き出して意味を覚える活動"],answer:0,explanation:"「聞くこと」の言語活動例として、日常的な話題の必要な情報の聞き取り、概要把握、社会的話題の要点把握などが示される。"},
  {id:"c110",category:"guideline",subcategory:"言語活動",question:"「読むこと」の言語活動例として中学校学習指導要領（外国語）に示されているものを選べ。",options:["物語やエッセイなどからあらすじや大切な部分を読み取る活動", "未知の語句について辞書で意味を調べて理解を深める活動", "英文を一文ずつ日本語に訳しながら内容を理解する活動", "英文中の文法事項を分析し構造を明らかにする活動"],answer:0,explanation:"「読むこと」の言語活動例には、物語やエッセイなどからの大切な部分の読み取り、必要な情報の読み取り、要点の把握などがある。"},
  {id:"c111",category:"guideline",subcategory:"言語活動",question:"「話すこと［やり取り］」の言語活動例として中学校学習指導要領（外国語）に示されているものを選べ。",options:["即興で自分の考えや気持ちなどを伝え合う活動", "事前に準備した原稿を正確に暗誦して発表する活動", "情報を整理しスライド等を用いて発表する活動", "相手の発話を日本語に訳して伝える通訳的な活動"],answer:0,explanation:"「話すこと［やり取り］」では即興性を重視した伝え合いの活動が示される。"},
  {id:"c112",category:"guideline",subcategory:"言語活動",question:"「話すこと［発表］」の言語活動例として中学校学習指導要領（外国語）に示されているものを選べ。",options:["関心のある事柄について、簡単な語句や文を用いて即興で話す活動、および話の構成を工夫して発表する活動", "事前に準備した原稿を正確に暗誦し、聞き手に朗読する活動のみ", "社会的な話題について立場を定め討論を行うディスカッションのみ", "相手の発話内容を日本語に置き換えて正確に伝える翻訳活動のみ"],answer:0,explanation:"「話すこと［発表］」の言語活動には、関心のある事柄について即興で話す、情報を整理して発表するなど多様なものが示される。"},
  {id:"c113",category:"guideline",subcategory:"言語活動",question:"「書くこと」の言語活動例として中学校学習指導要領（外国語）に示されているものを選べ。",options:["日常的な話題について、簡単な語句や文を用いて、事実や自分の考え、気持ちなどを書く活動", "学習した文法事項の定着を確認するための問題を解く活動", "日本語で書かれた文章を自然な英語に訳して書く活動", "聞いた英語を正確に書き取るディクテーション活動"],answer:0,explanation:"「書くこと」の言語活動例には、事実や自分の考え等を書く活動、社会的話題について書く活動など複数示される。"},
  {id:"c114",category:"guideline",subcategory:"言語の働き",question:"中学校学習指導要領（外国語）の「言語の働き」とは何を指すか、最も適切なものを選べ。",options:["言語がコミュニケーションで果たす働き（あいさつ、情報を伝える、気持ちを伝える、相手の行動を促す等）", "言語学的観点から英語を音声・語彙・文法等に分類したもの", "文法事項を説明するために用いられる専門的な用語の体系", "音声指導において扱う発音の種類を分類して整理したもの"],answer:0,explanation:"「言語の働き」は、コミュニケーションにおいて言語が果たす機能（functions）を指す。あいさつ、感謝、依頼、情報伝達などがある。"},
  {id:"c115",category:"guideline",subcategory:"言語の働き",question:"中学校学習指導要領（外国語）で示される「言語の働き」の例として正しい組み合わせを選べ。",options:["コミュニケーションを円滑にする、気持ちを伝える、事実・情報を伝える、考えや意図を伝える、相手の行動を促す", "文法事項を体系的に学ぶ、音声面の標準的な発音を学ぶ", "中学校段階で扱う語彙・連語・慣用表現を確実に増やす", "英語で得た情報を的確な日本語に置き換えて伝える"],answer:0,explanation:"「言語の働き」は大きく5つに分類される：①コミュニケーションを円滑にする、②気持ちを伝える、③事実・情報を伝える、④考えや意図を伝える、⑤相手の行動を促す。"},
  {id:"c116",category:"guideline",subcategory:"言語の働き",question:"「コミュニケーションを円滑にする」言語の働きの例として最も適切なものを選べ。",options:["あいさつする、呼びかける、相づちを打つ、聞き直す", "事実や状況について相手に的確に情報を伝える", "相手に対して指示を出したり行動を命じたりする", "相手の発話の文法的な誤りを指摘して訂正する"],answer:0,explanation:"「コミュニケーションを円滑にする」働きには、あいさつ、呼びかけ、相づち、聞き直しなどが含まれる。"},
  {id:"c117",category:"guideline",subcategory:"言語の働き",question:"「気持ちを伝える」言語の働きの例として最も適切なものを選べ。",options:["礼を言う、苦情を言う、褒める、謝る、感情を表す", "事実や状況について相手に的確に情報を伝える", "物事の進め方や操作の手順を順序立てて説明する", "相手に対して指示を出したり行動を命じたりする"],answer:0,explanation:"「気持ちを伝える」働きには、礼を言う、苦情を言う、褒める、謝る、感情を表すなどが含まれる。"},
  {id:"c118",category:"guideline",subcategory:"言語の働き",question:"「事実・情報を伝える」言語の働きの例として最も適切なものを選べ。",options:["説明する、報告する、描写する", "相手に指示を出したり行動を命じたりする", "自らの過失を認めて相手に謝罪の意を表す", "相手に何らかの行動への参加を呼びかけ誘う"],answer:0,explanation:"「事実・情報を伝える」働きには、説明する、報告する、描写する、理由を述べるなどが含まれる。"},
  {id:"c119",category:"guideline",subcategory:"言語の働き",question:"「考えや意図を伝える」言語の働きの例として最も適切なものを選べ。",options:["申し出る、約束する、意見を言う、賛成する、反対する、承諾する、断る", "場面に応じて適切にあいさつや呼びかけを行う", "事実や状況について相手に的確に情報を伝える", "相手に対して指示を出したり行動を命じたりする"],answer:0,explanation:"「考えや意図を伝える」働きには、申し出る、約束する、意見・賛否を言う、承諾する、断るなどが含まれる。"},
  {id:"c120",category:"guideline",subcategory:"言語の働き",question:"「相手の行動を促す」言語の働きの例として最も適切なものを選べ。",options:["質問する、依頼する、招待する、助言する、命令する、注意を引く", "場面に応じて適切にあいさつや呼びかけを行う", "事実や状況について相手に的確に情報を伝える", "相手に対して礼を言い感謝の気持ちを伝える"],answer:0,explanation:"「相手の行動を促す」働きには、質問する、依頼する、招待する、助言する、命令する、注意を引く、許可を求めるなどが含まれる。"},
  {id:"c121",category:"guideline",subcategory:"言語使用場面",question:"中学校学習指導要領（外国語）で示されている「言語の使用場面」の例として正しい組み合わせを選べ。",options:["特有の表現がよく使われる場面（買物・食事・道案内等）、生徒の身近な暮らしに関わる場面（家庭・学校・地域等）、多様な手段を通して情報などを得る場面", "英語圏における日常生活の場面に限定して使用場面を示している", "各種試験や学力調査において英語が用いられる評価場面を中心に示している", "文学作品や物語の中で描かれる架空の場面を中心に示している"],answer:0,explanation:"言語の使用場面は、特有の表現が使われる場面・生徒の身近な場面・多様な手段での情報入手場面、などが示される。"},
  {id:"c122",category:"guideline",subcategory:"言語使用場面",question:"「特有の表現がよく使われる場面」の具体例として最も適切なものを選べ。",options:["自己紹介、あいさつ、電話での応答、買物、道案内、旅行、食事など", "英語で書かれた文学作品の鑑賞や読解の場面", "各種の試験や学力調査が実施される評価の場面", "学術的な研究発表や専門的な講義の場面"],answer:0,explanation:"「特有の表現がよく使われる場面」として、自己紹介、あいさつ、電話、買物、道案内、旅行、食事などが例示される。"},
  {id:"c123",category:"guideline",subcategory:"言語使用場面",question:"「生徒の身近な暮らしに関わる場面」の具体例として最も適切なものを選べ。",options:["家庭での生活、学校での学習や活動、地域の行事など", "国際会議や国際交流の場で英語が用いられる場面", "海外旅行で現地の人々とやり取りを行う場面", "留学先での日常生活や学習を通じて英語を用いる場面"],answer:0,explanation:"「生徒の身近な暮らしに関わる場面」として、家庭での生活、学校での学習や活動、地域の行事などが例示される。"},
  {id:"c124",category:"guideline",subcategory:"言語使用場面",question:"「多様な手段を通して情報などを得る場面」の具体例として最も適切なものを選べ。",options:["本、新聞、雑誌、テレビ、ラジオ、映画、インターネット、メールなどから情報を得る場面", "対面でのコミュニケーションを通じて情報を得る場面に限定される", "各種試験や学力調査の問題文を通じて情報を得る場面を指す", "学校で使用する教科書や教材を通じて情報を得る場面を指す"],answer:0,explanation:"「多様な手段を通して情報などを得る場面」として、本、新聞、雑誌、テレビ、ラジオ、映画、インターネット、メールなどが例示される。"},
  {id:"c125",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で強調される「目的や場面、状況などに応じた」言語活動の意義として最も適切なものを選べ。",options:["単なる言語形式の練習ではなく、コミュニケーションの文脈で言語を使う経験を積むこと", "各種試験や学力調査で問われる形式に慣れ、対応力を育てること", "中学校段階で扱う文法事項を体系的に学習し定着させること", "学習した語彙や表現を確実に記憶し、再生できるようにすること"],answer:0,explanation:"「目的や場面、状況などに応じた」言語活動は、実際のコミュニケーションの文脈で言語を使う経験を積ませる意義を持つ。"},
  {id:"c126",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）「内容の取扱い」で、言語活動で取り扱う題材について正しい組み合わせを選べ。",options:["生徒の興味・関心に合ったもの、発達段階に応じたもの、言語や文化に対する理解を深めるもの等", "大学入試や高等学校入試の水準を意識した高度な内容の題材", "日本語と英語の対応を学習するための翻訳練習に適した題材", "英語圏の文学作品の中から生徒の発達段階に応じて選ばれる題材"],answer:0,explanation:"題材は生徒の興味・関心・発達段階に合い、言語や文化への理解を深め、国際理解や国際協調の精神を養うものとされる。"},
  {id:"c127",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で求められる言語活動の展開として最も適切なものを選べ。",options:["小学校で扱った言語活動に配慮しながら、中学校段階で発展させる", "小学校における学習とは区別し、中学校独自の内容として進める", "高等学校で扱う言語活動の一部を先取りして中学校段階で扱う", "高等学校入学者選抜を見据え、出題形式に対応した活動を中心とする"],answer:0,explanation:"小学校外国語活動・外国語科との接続を重視し、中学校段階で言語活動を発展させる。"},
  {id:"c128",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）の言語活動では、小学校で学習した言語材料をどう扱うか、最も適切なものを選べ。",options:["繰り返し活用することによって、生徒が自分の考えなどを表現する力を身に付けられるようにする", "小学校で既習のため中学校では改めて扱わないこととする", "小学校で扱った言語材料は中学校入学時に一度確認する程度にとどめる", "小学校で扱った言語材料は定期テスト等の出題範囲として活用する"],answer:0,explanation:"小・中学校の接続を重視し、小学校で学習した語彙・表現などを異なる場面で繰り返し活用することで定着と表現力を育てる。"},
  {id:"c129",category:"guideline",subcategory:"思考力等",question:"中学校学習指導要領（外国語）の内容(2)の構成として最も適切なものを選べ。",options:["5領域ごとに、「～すること」という形でア・イ等で具体事項が示されている", "第1〜第3学年までの学年別に具体的な事項が段階的に示されている", "扱う文法事項ごとに対応する思考・判断・表現の具体事項が示されている", "授業で扱う題材ごとに具体的な活動の事項が整理されて示されている"],answer:0,explanation:"内容(2)は5領域ごとに、具体的に行う活動が「～すること」の形で示されている。"},
  {id:"c130",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で、言語活動において生徒が経験すべき「情報を整理しながら考えなどを形成する」過程の例として最も適切なものを選べ。",options:["読んだ内容について、大切な部分をメモし、自分の考えをまとめて書く", "読んだ英文を一文ずつ丁寧に日本語に訳して内容を確かめる", "読んだ英文中の未知の語句を抜き出し、意味を覚えて定着させる", "読んだ英文の構造を文法的に分析し、規則性を体系的に理解する"],answer:0,explanation:"「情報を整理しながら考えなどを形成する」とは、読んだり聞いたりして得た情報を整理し、自分の考えを構築する思考過程を指す。"},
  {id:"c131",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）において、領域「聞くこと」の言語活動例に含まれる活動として最も適切なものを選べ。",options:["音声教材等による概要把握・要点把握・必要な情報の聞き取り", "教科書本文を適切な発音・抑揚で音読する活動", "まとまりのある英文を聞き手に伝えるよう朗読する活動", "代表的な英文を正確に記憶し、声に出して暗唱する活動"],answer:0,explanation:"「聞くこと」の言語活動例には、概要把握、要点把握、必要な情報の聞き取りなど、リスニングのサブスキルに対応する活動が含まれる。"},
  {id:"c132",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）の「話すこと［やり取り］」の言語活動として、即興性を伴うやり取りの具体例として最も適切なものを選べ。",options:["身近な事柄について即興で質問し合ったり、答え合ったりする活動", "事前に準備したモデル会話を正確に記憶して再現する活動", "社会的な話題について立場を定めて論拠を示し討論する活動", "相手の発話内容を日本語に置き換えて正確に伝える活動"],answer:0,explanation:"即興性を伴うやり取りとは、用意した台本ではなく、その場で質問・応答を行う活動を指す。"},
  {id:"c133",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）「話すこと［発表］」の言語活動で、「情報を整理する」段階で行うべき活動として最も適切なものを選べ。",options:["発表する内容についてメモやアウトラインを作成する", "発表する原稿全体を一字一句違わず正確に記憶する", "発表内容を日本語で考えた後に英語に訳して準備する", "完成した原稿を発表本番に向けて繰り返し声に出して読み上げる"],answer:0,explanation:"発表前の情報整理として、メモやアウトライン作成が想定され、発表時には自分で作成したメモ等を活用できる。"},
  {id:"c134",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で言語活動を通じて育成される「思考力、判断力、表現力等」の具体的要素として最も適切なものを選べ。",options:["情報整理・論理的表現・目的や場面に応じた伝え方の工夫", "中学校段階で定着させるべき言語材料の暗記量の拡大", "場面や状況に応じた音声の正確さと標準的な発音の習得", "中学校段階で扱うべき文法事項についての体系的な知識量"],answer:0,explanation:"思考力、判断力、表現力等は、情報整理・論理的表現・目的や場面・状況に応じた伝え方などを通じて育成される。"},
  {id:"c135",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）「話すこと［やり取り］」の言語活動における「伝え合う」とはどういう活動か、最も適切なものを選べ。",options:["双方向のコミュニケーションとして、お互いに質問し応答する双方向性のあるやり取り", "自分の考えや情報を聞き手に向けて一方的に伝達する活動", "事前に準備し記憶した英文を正確に再現して相手に伝える活動", "日本語の内容を自然な英語に訳して聞き手に披露する活動"],answer:0,explanation:"「伝え合う」は、双方向のコミュニケーションとして相手の発話を踏まえて応答するやり取りを指す。"},
  {id:"c136",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）における「意味のある文脈」でのコミュニケーションの意義として最も適切なものを選べ。",options:["単語・文法の知識を実際の意味・場面と結び付け、運用力に転化する", "中学校段階で扱う語彙や表現の暗記量を効率的に増やす", "各種試験や学力調査で問われる形式に対応する力を育てる", "日本語と英語の対応関係を理解し、的確な翻訳力を高める"],answer:0,explanation:"意味のある文脈は、言語知識を実際のコミュニケーションにおける運用力に転化する上で不可欠。"},
  {id:"c137",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）の「書くこと」の言語活動に含まれる具体例として最も適切なものを選べ。",options:["日常的な話題について、事実や自分の考えなどを整理し、簡単な語句や文を用いてまとまりのある文章を書く活動", "学習した文法事項の定着を確認するための問題を解く活動", "未知の語句について辞書を用いて意味や用法を調べる活動", "学習した語彙の定着状況を確認する単語テストを受ける活動"],answer:0,explanation:"「書くこと」の言語活動例には、自分の考えをまとまりのある文章として書く活動、事実や情報を書く活動などが含まれる。"},
  {id:"c138",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で言語活動を計画する際に、必ず考慮すべきこととして最も適切なものを選べ。",options:["コミュニケーションを行う目的や場面、状況などを明確に設定すること", "各単元で生徒が暗記すべき語彙や表現の具体的な分量", "各単元の内容が定期テスト等で占めるべき配点の割合", "各単元で扱うべき文法項目の数と指導に要する時間数"],answer:0,explanation:"「指導計画の作成と内容の取扱い」で「各単元や各時間の指導に当たっては，コミュニケーションを行う目的，場面，状況などを明確に設定」することが求められる。"},
  {id:"c139",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で、生徒が「学習の見通しを立てたり、振り返ったりする」ことを可能にするために教師が示すべきものとして最も適切なものを選べ。",options:["言語活動を通して育成すべき資質・能力の明確な提示", "単元末テストや定期考査における試験範囲の具体的な提示", "学期末の評定算出に用いられる成績評価基準の明示", "各単元の指導時数と進度を明らかにした授業スケジュール"],answer:0,explanation:"「言語活動を通して育成すべき資質・能力を明確に示すことにより，生徒が学習の見通しを立てたり，振り返ったりすることができるようにすること」と示される。"},
  {id:"c140",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）における「言語活動を通して育成すべき資質・能力」の明示の意義として最も適切なものを選べ。",options:["生徒が自らの学習を自覚的に進め、主体的に学べるようにするため", "学期末や年度末の成績評価を客観的に行うための基準とするため", "各種試験や入学者選抜で求められる力への対策を行うため", "授業運営を円滑に進めるための教員側の指導計画として活用するため"],answer:0,explanation:"育成すべき資質・能力を明確に示すことで、生徒が主体的・自覚的に学習に取り組めるようになる。"},
  {id:"c141",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で、「授業は英語で行うことを基本とする」とされている理由として最も適切なものを選べ。",options:["生徒が英語に触れる機会を充実し、英語による実際のコミュニケーションを経験できるようにするため", "教員自身が英語を用いる機会を設け、指導技術の向上を図るため", "日本語による説明を省くことで授業時間を効率的に短縮するため", "限られた授業時数の中で教科書の内容を最後まで扱えるようにするため"],answer:0,explanation:"「授業は英語で行うことを基本とする」の趣旨は、生徒が英語に触れ、実際のコミュニケーションを経験する機会を充実させるため。"},
  {id:"c142",category:"guideline",subcategory:"言語活動",question:"「授業は英語で行うことを基本とする」に関する解説の説明として最も適切なものを選べ。",options:["生徒の理解に応じた適切な英語で授業を行うとともに、生徒の理解の状況を踏まえて必要に応じて日本語で説明するなど、柔軟に対応する", "授業中における日本語の使用はいかなる場合も認めないこととする", "生徒の発話もすべて英語で行うこととし、日本語での発言は認めない", "教師と生徒の双方が授業中は原則として英語のみを用いることとする"],answer:0,explanation:"指導要領解説では、生徒の理解に応じた適切な英語で授業を行うとともに、必要に応じて日本語を使用することも許容されている。"},
  {id:"c143",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で、「言語活動」において生徒が体験すべきプロセスとして最も適切なものを選べ。",options:["話す／書く前に、情報や自分の考えを整理する過程を含む", "事前に暗記した英文を場面に応じて正確に再現する過程", "日本語で考えた内容を自然な英語に置き換える翻訳の過程", "扱う文法事項を用いた構造化された練習を繰り返す過程"],answer:0,explanation:"言語活動では、単に話す・書くだけではなく、情報を整理し考えを形成するプロセスが含まれる。"},
  {id:"c144",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）の「言語活動」における「論理的に表現する」とはどういうことか、最も適切なものを選べ。",options:["理由や根拠を示しながら考えを筋道立てて伝える", "学習した文法事項を誤りなく正確に用いて表現する", "場面の流れを止めないよう一定の速さで淀みなく話す", "聞き手全員に届くよう十分な声量を保って明瞭に話す"],answer:0,explanation:"「論理的に表現する」は、理由や根拠を示しながら考えを筋道立てて伝えること。情報整理を前提とする。"},
  {id:"c145",category:"guideline",subcategory:"思考力等",question:"中学校学習指導要領（外国語）の内容(2)と(3)の関係として最も適切なものを選べ。",options:["(2)で「何をすべきか」（思考・判断・表現として身に付ける事項）を示し、(3)でそのための具体的な言語活動例を示す", "(2)と(3)は同じ内容を観点を変えて繰り返し示している関係にある", "(2)は基礎的な練習を、(3)は発展的な実践活動をそれぞれ示している", "(2)は指導の理論的な原則を、(3)はその応用方法をそれぞれ示している"],answer:0,explanation:"(2)で身に付ける事項を示し、(3)でそのための具体的な言語活動例を示す構造。両者は一体的。"},
  {id:"c146",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で「即興性」が特に重視される領域として正しいものを選べ。",options:["話すこと［やり取り］", "書くこと", "読むこと", "聞くこと"],answer:0,explanation:"即興性は特に「話すこと［やり取り］」で重視される。相手との双方向的なコミュニケーションに必要な力。"},
  {id:"c147",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）で「話すこと［発表］」の言語活動で想定される発表の例として最も適切なものを選べ。",options:["関心のある事柄や日常的な話題について、自分の考えや気持ちなどを理由や根拠を示しながら話す活動", "教科書本文などの代表的な英文を正確に記憶して声に出す暗唱活動", "まとまりのある英文を聞き手に伝えるよう音読する朗読活動", "日本語で書かれた原稿を自然な英語に置き換えて伝える翻訳活動"],answer:0,explanation:"発表では、関心のある事柄・日常的・社会的な話題について、理由や根拠を示しながら話す活動が想定される。"},
  {id:"c148",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）の「読むこと」の言語活動で、必要な情報を読み取る活動の例として最も適切なものを選べ。",options:["表示・掲示・パンフレットなどから必要な情報を読み取る活動", "英語で書かれた小説を読んで自然な日本語に訳す活動", "英語圏の古典文学作品を読み、内容を鑑賞する活動", "社会的な話題を専門的に論じた書籍を読み通す活動"],answer:0,explanation:"必要な情報の読み取り活動としては、身近な表示・掲示・パンフレット・ウェブサイトなどが題材として適切。"},
  {id:"c149",category:"guideline",subcategory:"言語活動",question:"中学校学習指導要領（外国語）「書くこと」の言語活動における「整理して書く」の具体例として最も適切なものを選べ。",options:["メモやアウトラインを書いた後、構成を工夫して文章にする", "話題を与えられてからすぐに文章を書き始め流れに任せて書く", "日本語で書かれた文章を自然な英語に訳しながら文章を書く", "教科書や資料から必要な語句や文を抜き出して書き写す"],answer:0,explanation:"書く前に情報を整理しアウトラインを作成する過程を経ることで、構成の整った文章を書く指導が想定される。"},
  {id:"c150",category:"guideline",subcategory:"言語の働き",question:"中学校学習指導要領（外国語）の「言語の働き」が指導に活用される場面として最も適切なものを選べ。",options:["場面に応じた適切な表現を学ぶこと、コミュニケーションの意図を明確にすることなど", "各種試験や学力調査で問われる表現を効率的に学ぶ枠組み", "中学校段階で扱う文法事項を体系的に記憶させる枠組み", "音声面における標準的な発音を身に付けさせる枠組み"],answer:0,explanation:"「言語の働き」は、場面・意図に応じた適切な表現を学ぶ枠組みとなる。"},
  {id:"c151",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「指導計画の作成と内容の取扱い」(1)アで示されている「学年ごとの目標」の扱いとして正しいものを選べ。",options:["各学校で生徒や地域の実態に応じて適切に定め、3学年間を通して英語の目標の実現を図る", "文部科学省が学年別の到達目標を一律に指定し、各学校で遵守する", "学年ごとの目標は設定せず、3学年を通じた包括的な目標のみ定める", "全国的な統一テストの結果に基づいて学年ごとの目標を定める"],answer:0,explanation:"「各学校においては，生徒や地域の実態に応じて，学年ごとの目標を適切に定め，3学年間を通して英語の目標の実現を図るようにすること」と示される。"},
  {id:"c152",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「指導計画の作成と内容の取扱い」で、言語材料の扱いとして正しいものを選べ。",options:["学習段階に応じて平易なものから難しいものへと段階的に指導する", "扱う言語材料は第1学年のうちに網羅的に導入することとする", "難しい言語材料から先に指導し、後から平易なものを確認する", "学習進度に応じて言語材料の順序を柔軟に入れ替えて扱う"],answer:0,explanation:"「2の（3）の言語材料については，学習段階に応じて平易なものから難しいものへと段階的に指導すること」と示される。"},
  {id:"c153",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）の指導計画作成において、小学校・高等学校との関係として最も適切なものを選べ。",options:["小学校や高等学校における指導との接続に留意する", "小学校・高等学校とは独立した中学校独自の指導を展開する", "小学校における指導との接続のみを重視して計画を作成する", "高等学校における指導との接続のみを重視して計画を作成する"],answer:0,explanation:"小中高の接続は今回改訂の重要ポイントで、指導計画作成時に小学校や高等学校の指導との接続に留意することが求められる。"},
  {id:"c154",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）解説で、小学校で学習した語彙の扱いについて最も適切なものを選べ。",options:["異なる場面の中で繰り返し活用することによって、生徒が自分の考えなどを表現する力を身に付けられるようにする", "小学校で既習のため中学校段階では改めて復習しないこととする", "小学校で扱った語彙は中学校入学時に改めて体系的に再教授する", "小学校で扱った語彙の定着状況は定期テストで確認することとする"],answer:0,explanation:"小学校で学習した語彙・表現は、異なる場面で繰り返し活用することで定着・活用力を育てる。"},
  {id:"c155",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「指導計画の作成と内容の取扱い」で、授業の基本的な言語として示されているものを選べ。",options:["授業は英語で行うことを基本とする", "授業は生徒の理解度を踏まえて日本語で行うことを基本とする", "授業は英語と日本語を半々の割合で用いて行うこととする", "授業で用いる言語は各教員の判断と学級の実態に委ねる"],answer:0,explanation:"「授業は英語で行うことを基本とする」は今回改訂の重要な記述の一つ。中学校でも高校同様の方針が示された。"},
  {id:"c156",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で、授業における言語使用の配慮として最も適切なものを選べ。",options:["生徒が英語に触れる機会を充実するとともに、授業を実際のコミュニケーションの場面とするため、授業は英語で行うことを基本とする", "授業中における日本語の使用は教員・生徒を問わず認めないこととする", "生徒の発話もすべて英語で行うこととし、日本語での発言は認めない", "生徒の確実な理解を図るため、文法事項等は日本語で詳細に説明する"],answer:0,explanation:"英語使用の基本は、生徒の英語に触れる機会の充実と、授業自体を実際のコミュニケーション場面とするための方針。"},
  {id:"c157",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）の「内容の取扱い」で、文法指導に関する最も重要な原則として正しいものを選べ。",options:["コミュニケーションを支えるものとして、言語活動と効果的に関連付けて指導する", "文法事項は言語活動とは独立した単元として体系的に指導する", "文法事項の定着のために繰り返し反復する暗記中心の指導を徹底する", "文法用語や用法の区別を正確に理解させることを優先して指導する"],answer:0,explanation:"「文法については，コミュニケーションを支えるものであることを踏まえ，言語活動と効果的に関連付けて指導すること」と示される。"},
  {id:"c158",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、言語材料の扱いとして「言語活動と効果的に関連付ける」ことが求められる理由として最も適切なものを選べ。",options:["言語材料を実際のコミュニケーションの中で運用できるようにするため", "定期テストや入学者選抜で問われる知識として定着させるため", "言語材料をより効率的に記憶し、確実に再生できるようにするため", "日本語と英語の対応関係を理解し、的確な翻訳が行えるようにするため"],answer:0,explanation:"言語材料は単なる知識ではなく、言語活動を通じて実際に運用できるようにすることが目的。"},
  {id:"c159",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、文字指導として示される内容として正しいものを選べ。",options:["文字指導に当たっては、生徒の学習負担に配慮し筆記体を指導することもできる", "英語圏の一般的な書字に準じて筆記体を必ず指導することとする", "学習負担に配慮し、文字指導においては活字体のみを指導する", "ICTの活用が進んだ現状を踏まえ、手書きによる指導は行わない"],answer:0,explanation:"「文字指導に当たっては，生徒の学習負担に配慮し筆記体を指導することもできる」と示される。"},
  {id:"c160",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、辞書の扱いとして示されるものを選べ。",options:["辞書の使い方に慣れ、活用できるようにする", "未知語の推測力を育てるため辞書の使用は原則として認めない", "辞書の使用は定期テスト等の評価場面の後に限って認める", "電子機器の活用が進んだ現在では辞書の指導は不要とされる"],answer:0,explanation:"「辞書の使い方に慣れ，活用できるようにすること」と示される。辞書を自律的学習の道具として位置付ける。"},
  {id:"c161",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、ICT等の活用として示されるものを選べ。",options:["生徒の実態や教材の内容などに応じて、コンピュータや情報通信ネットワーク、教育機器などを有効活用したり、ネイティブ・スピーカーなどの協力を得たりなどする", "生徒の発達段階に配慮しICT機器の活用は必要最小限にとどめる", "生徒の理解を確実にするためALT等の協力は原則として求めない", "検定を経た教科書のみを教材として用い、他の教材は補助的に扱う"],answer:0,explanation:"ICT活用とネイティブ・スピーカーの協力は、指導の効果を高めるために活用することが求められる。"},
  {id:"c162",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で、ペアワークやグループワークの扱いとして最も適切なものを選べ。",options:["ペアワーク、グループワークなどの学習形態を適宜工夫する", "生徒一人一人の習熟度に応じた個別学習の形態のみを用いる", "教員による体系的な説明を中心とした講義形式のみを用いる", "学習集団の統制を保つためペア・グループワークは用いない"],answer:0,explanation:"「ペアワーク，グループワークなどの学習形態を適宜工夫すること」と示され、多様な形態の活用が求められる。"},
  {id:"c163",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「指導計画の作成と内容の取扱い」で、教材の選定基準として最も適切なものを選べ。",options:["生徒の発達の段階及び興味・関心に即して適切な題材を変化をもたせて取り上げる", "生徒に高い学習意欲を求めるため発達段階より難しい題材を中心に扱う", "英語圏の文化理解を重視し、文学作品を中心とした題材を扱う", "指導経験を踏まえた教員の知見と好みに基づいて題材を選定する"],answer:0,explanation:"「生徒の発達の段階及び興味・関心に即して適切な題材を変化をもたせて取り上げる」ことが求められる。"},
  {id:"c164",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で、教材の配慮事項に含まれるものとして正しい組み合わせを選べ。",options:["多様な考え方への理解を深める／外国や我が国の生活や文化についての理解を深める／広い視野から国際理解を深める", "中学校で扱う文法事項を重点的に取り上げた題材を中心に扱う", "定期テストや入学者選抜で頻出する事項を含む題材を中心に扱う", "音声面の指導を充実させるため発音の習得に資する題材を中心に扱う"],answer:0,explanation:"教材の配慮として、多様な考え方への理解、外国や我が国の生活・文化理解、国際理解の深化などが示される。"},
  {id:"c165",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、題材選定の配慮点として「国際社会に生きる日本人としての自覚」について最も適切なものを選べ。",options:["広い視野から国際理解を深めるとともに、国際社会に生きる日本人としての自覚を高め、国際協調の精神を養うのに役立つこと", "日本文化の独自性や優位性を他国の文化と比較して示すのに役立つこと", "我が国の伝統や文化を扱った題材を中心に取り上げることを求めること", "英語圏の文化や生活を中心に取り上げ、外国理解を深めることを求めること"],answer:0,explanation:"「広い視野から国際理解を深めるとともに，国際社会に生きる日本人としての自覚を高めるとともに，国際協調の精神を養うのに役立つこと」と示される。"},
  {id:"c166",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で、教材の範囲として示されるものとして最も適切なものを選べ。",options:["生徒の身近な暮らし、風俗習慣、物語、地理、歴史、伝統文化や自然科学などに関するもの", "英語圏で広く読まれている文学作品を中心に題材を取り上げる", "社会的関心を高めるため政治・経済に関する題材を中心に扱う", "入学者選抜等で頻出する事項を含む題材を中心に取り上げる"],answer:0,explanation:"教材の範囲として、生徒の身近な暮らし、風俗習慣、物語、地理、歴史、伝統文化、自然科学など多様なものが示される。"},
  {id:"c167",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、学年ごとの言語活動の配慮として最も適切なものを選べ。",options:["第1学年は小学校で学習した内容を繰り返し活用し、学年が上がるにつれて言語の使用場面や言語の働きを広げる", "各学年の言語活動は他学年とは独立して構成することが求められる", "第1学年から発展的で難しい内容を扱い、高い水準の活動を展開する", "第3学年においても基本的な言語活動にとどめ、定着を重視する"],answer:0,explanation:"学年ごとに指導計画を配慮しつつ、小学校の学習内容の活用と、学年進行に応じた言語使用場面・働きの拡大が示される。"},
  {id:"c168",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）の指導計画作成の原則として「学習の見通しと振り返り」の工夫が求められる理由として最も適切なものを選べ。",options:["生徒の主体的な学びを促すため", "学期末や年度末の成績評価を客観的に実施するため", "高等学校入学者選抜等の試験への対応力を育てるため", "保護者に対して学習状況を説明する資料とするため"],answer:0,explanation:"学習の見通しと振り返りの工夫は、生徒の主体的な学び（自己調整学習）を促すために重要。"},
  {id:"c169",category:"guideline",subcategory:"小中高接続",question:"中学校学習指導要領（外国語）における小学校との接続に関する記述として最も適切なものを選べ。",options:["小学校で扱われた言語材料（語彙・表現等）を踏まえて、中学校で発展させる", "中学校入学時に一度学習内容を整理し、改めて基礎から指導し直す", "小学校と中学校における指導内容は独立しており相互に関連しない", "小学校で学習した内容は中学校段階で改めて体系的に再教授する"],answer:0,explanation:"小学校で学習した語彙・表現の定着を図り、それを踏まえて中学校で発展させる指導が求められる。"},
  {id:"c170",category:"guideline",subcategory:"小中高接続",question:"中学校学習指導要領（外国語）における高等学校との接続に関する記述として最も適切なものを選べ。",options:["高等学校における指導との接続に留意し、円滑な学びのつながりを確保する", "高等学校で扱う内容を中学校で先取りして指導するよう求める", "高等学校の指導内容は中学校とは区別し、中学校では扱わない", "高等学校の指導は中学校とは独立しており関連付けて扱わない"],answer:0,explanation:"高等学校との接続にも留意して、中学校段階で基盤を作り、高校での発展的学習につなげる。"},
  {id:"c171",category:"guideline",subcategory:"小中高接続",question:"小学校外国語科（5・6年生）の目標に含まれる資質・能力の表現として正しいものを選べ。",options:["コミュニケーションを図る基礎となる資質・能力", "コミュニケーションを図る素地となる資質・能力", "コミュニケーションを図る資質・能力", "コミュニケーションを的確に図ることのできる資質・能力"],answer:0,explanation:"小学校外国語科（5・6年生）は「基礎となる」、外国語活動（3・4年生）は「素地となる」、中学校外国語科は「資質・能力」、高校は「的確に理解し適切に表現する」と段階化。"},
  {id:"c172",category:"guideline",subcategory:"小中高接続",question:"小学校外国語活動（3・4年生）の目標に含まれる資質・能力の表現として正しいものを選べ。",options:["コミュニケーションを図る素地となる資質・能力", "コミュニケーションを図る基礎となる資質・能力", "コミュニケーションを図る資質・能力", "コミュニケーションを的確に図ることのできる資質・能力"],answer:0,explanation:"小学校外国語活動（3・4年生）は「素地となる」資質・能力の育成が目標。"},
  {id:"c173",category:"guideline",subcategory:"小中高接続",question:"中学校外国語科と高校外国語科の目標の「コミュニケーションを図る資質・能力」の表現として正しい比較を選べ。",options:["中学校「簡単な情報や考えなどを理解したり表現したり伝え合ったりする」、高校「情報や考えなどを的確に理解したり適切に表現したり伝え合ったりする」", "中学校と高等学校の目標はいずれも同一の表現で示されている", "中学校は概括的な表現にとどめ、高等学校では詳細に細分化して示している", "中学校と高等学校は独立した観点から目標が設定されている"],answer:0,explanation:"中学校は「簡単な情報や考えなどを…」、高校は「情報や考えなどを的確に…適切に…」と段階化されている。"},
  {id:"c174",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で「話すこと」が2つに分けられた目的として最も適切なものを選べ。",options:["対話的・双方向的な力と一方向的・継続的に話す力を区別して育てるため", "話すことの評価項目を分けて、観点別の評価を容易にするため", "定期テストや学力調査における出題形式に対応するため", "限られた授業時数の中で話すことの指導時間を短縮するため"],answer:0,explanation:"双方向的な［やり取り］と一方向的・継続的な［発表］はコミュニケーションの異なる側面であり、それぞれの特性に応じた育成を目指す。"},
  {id:"c175",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）の語彙数増加の背景として最も適切なものを選べ。",options:["小学校外国語科の導入により小学校から中学校への接続が強化され、中学校でより多くの語彙に触れる段階になったため", "高等学校入学者選抜で求められる語彙量の増加に対応するため", "国際的な言語能力評価の基準に合わせて語彙数を調整するため", "前回改訂時の語彙数が実態に合っていなかったため見直されたため"],answer:0,explanation:"小学校で600〜700語程度を学習するようになったため、中学校では1600〜1800語程度の新語を加えることで、合計2200〜2500語となり、高校との接続も円滑化される。"},
  {id:"c176",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂で中学校学習指導要領（外国語）の文法事項に追加された内容として正しい組み合わせを選べ。",options:["感嘆文の基本、現在完了進行形、仮定法の基本、原形不定詞を伴う構文", "分詞構文の基本と、強調や疑問を表す倒置構文", "関係副詞 where, when と、whoever などの複合関係詞", "主節と異なる主語を持つ独立分詞構文の基本的な形"],answer:0,explanation:"今回改訂で中学校に加わった文法事項は、感嘆文（基本）、現在完了進行形、仮定法（基本）、原形不定詞を伴う構文など。"},
  {id:"c177",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で5領域の記載順序が変更されたが、その新しい順序として正しいものを選べ。",options:["聞く→読む→話す［やり取り］→話す［発表］→書く", "聞く→話す［やり取り］→話す［発表］→読む→書く", "読む→書く→話す［やり取り］→話す［発表］→聞く", "書く→読む→聞く→話す［やり取り］→話す［発表］"],answer:0,explanation:"前回の「聞く→話す→読む→書く」から、今回は「聞く→読む→話す［やり取り］→話す［発表］→書く」に変更された。受容→発信の流れを明確化。"},
  {id:"c178",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で「授業は英語で行うことを基本とする」が新たに明示されたが、これに関連する指導方針として最も適切なものを選べ。",options:["実際のコミュニケーション場面として授業を位置付け、生徒の英語に触れる機会を充実する", "授業中における日本語の使用を教員・生徒を問わず完全に禁止する", "母語話者と同等の発音水準を生徒全員に身に付けさせることを求める", "各種試験や入学者選抜で問われる英語運用力に対応するための方針である"],answer:0,explanation:"授業を実際のコミュニケーション場面と位置付け、生徒の英語に触れる機会を充実する狙いがある。"},
  {id:"c179",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）における「評価」の観点として示される3観点として正しい組み合わせを選べ。",options:["知識・技能／思考・判断・表現／主体的に学習に取り組む態度", "関心・意欲・態度／思考・判断／技能・表現／知識・理解", "聞くこと／読むこと／話すこと／書くことの四つの観点", "語彙・表現／文構造・文法／音声・発音の三つの観点"],answer:0,explanation:"今回改訂で評価の観点は、目標の三つの柱に対応する「知識・技能」「思考・判断・表現」「主体的に学習に取り組む態度」の3観点に整理された。"},
  {id:"c180",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）が告示された年度および全面実施年度として正しい組み合わせを選べ。",options:["平成29年告示、令和3年度全面実施", "平成28年告示、令和2年度全面実施", "平成30年告示、令和4年度全面実施", "平成27年告示、令和元年度全面実施"],answer:0,explanation:"平成29年（2017年）3月告示、令和3年度（2021年度）から全面実施。これに先立ち移行措置期間があった。"},
  {id:"c181",category:"guideline",subcategory:"改訂のポイント",question:"今回の改訂で重視された「主体的・対話的で深い学び」との関連で、外国語科の指導として最も適切なものを選べ。",options:["学習過程を繰り返し経るような指導の改善・充実（見通しを立てる→言語活動→振り返り）", "教員による体系的な説明を中心に据えた講義形式の指導", "語彙や表現を確実に定着させるための暗記を中心とした指導", "各種試験や入学者選抜で求められる力の育成を中心とした指導"],answer:0,explanation:"外国語科においても、主体的・対話的で深い学びを実現するため、学習過程を繰り返し経るような指導の改善・充実が図られる。"},
  {id:"c182",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で重視された「他教科との関連」について正しいものを選べ。",options:["他教科等で学んだ内容と関連付けるなど、教科等横断的な学習の充実を図る", "外国語科は他教科とは区別された独立した指導を展開することとする", "外国語科の学習内容の特性上、他教科との関連付けは特に求められない", "外国語科の指導時数を確保するため他教科の授業時間を一部借用する"],answer:0,explanation:"外国語科と他教科・総合的な学習の時間等との関連付けにより、教科等横断的な学習の充実を図ることが求められる。"},
  {id:"c183",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で、「見方・考え方」が新たに示されたが、その教育的意義として最も適切なものを選べ。",options:["教科等の特質に応じた物事を捉える視点・考え方を明示し、教科の本質的な学びの質を高めるため", "これまで用いられてきた概念を整理し、新たな用語として追加したもの", "授業を構成する際に教員が参照すべき指導上の留意点を示したもの", "各種試験や学力調査の問題作成に資する枠組みを示したもの"],answer:0,explanation:"「見方・考え方」は、各教科等の特質に応じた物事を捉える視点・考え方を明示し、教科の本質的な学びを深めることを狙う。"},
  {id:"c184",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で「言語材料の取扱い」として、「意味のある文脈」の重要性が示されるが、その実践例として最も適切なものを選べ。",options:["場面・状況を設定した言語活動の中で言語材料を繰り返し使用させる", "文法事項を体系的にまとめたリストに沿って言語材料を記憶させる", "単語帳や例文集を活用し、言語材料を効率的に記憶させる", "例文の和訳を通じて言語材料の意味と用法を理解させる"],answer:0,explanation:"「意味のある文脈」での言語材料の使用とは、場面・状況を明確にした言語活動の中で繰り返し使うことで、知識の定着と活用力を育てる。"},
  {id:"c185",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）の「教材」の取扱い方針として、正しいものを選べ。",options:["5領域別の目標と内容との関係について、単元など内容や時間のまとまりごとに各教材の中で明確に示すとともに、実際の言語の使用場面や言語の働きに十分配慮した題材を取り上げる", "扱う文法事項の難易度や体系性に沿った順序で教材を配列することとする", "入学者選抜や学力調査等で問われる順序に沿って教材を配列することとする", "学習した言語材料を確実に記憶させることを主たる目的として教材を扱う"],answer:0,explanation:"教材は5領域別の目標と内容との関係を明確に示し、実際の言語使用場面や言語の働きに配慮した題材を扱う。"},
  {id:"c186",category:"guideline",subcategory:"授業時数",question:"中学校外国語科の標準授業時数として正しいものを選べ。",options:["各学年 年間140単位時間（週4単位時間相当）", "各学年 年間105単位時間（週3単位時間相当）", "各学年 年間175単位時間（週5単位時間相当）", "各学年 年間70単位時間（週2単位時間相当）"],answer:0,explanation:"中学校外国語（英語）の標準授業時数は、各学年で年間140単位時間（週4コマ相当）。小学校5・6年生の外国語科は年間70時間（週2コマ）。"},
  {id:"c187",category:"guideline",subcategory:"授業時数",question:"小学校外国語活動（3・4年生）の標準授業時数として正しいものを選べ。",options:["年間35単位時間（週1単位時間相当）", "年間70単位時間（週2単位時間相当）", "年間105単位時間（週3単位時間相当）", "年間140単位時間（週4単位時間相当）"],answer:0,explanation:"小学校中学年の外国語活動は年間35単位時間（週1コマ相当）。高学年の外国語科は年間70単位時間（週2コマ相当）。"},
  {id:"c188",category:"guideline",subcategory:"授業時数",question:"小学校外国語科（5・6年生）の標準授業時数として正しいものを選べ。",options:["年間70単位時間（週2単位時間相当）", "年間35単位時間（週1単位時間相当）", "年間105単位時間（週3単位時間相当）", "年間140単位時間（週4単位時間相当）"],answer:0,explanation:"小学校高学年の外国語科は年間70単位時間（週2コマ相当）。"},
  {id:"c189",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で「各単元や各時間の指導に当たっては」示される配慮として最も重要なものを選べ。",options:["コミュニケーションを行う目的、場面、状況などを明確に設定し、言語活動を通して育成すべき資質・能力を明確に示す", "各単元で扱う文法事項を明示し、生徒が確実に記憶できるようにする", "各単元が定期テスト等で出題される範囲であることを生徒に明示する", "日本語と英語の対応を意識させるための翻訳練習を必ず含める"],answer:0,explanation:"単元や各時間の指導では、コミュニケーションの目的・場面・状況の設定と、育成すべき資質・能力の明示が求められる。"},
  {id:"c190",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「指導計画の作成と内容の取扱い」で、指導方法・指導体制の観点として最も適切なものを選べ。",options:["学校の実態に応じて指導方法・指導体制を工夫改善し、個に応じた指導の充実を図る", "学級全体で同一の内容と方法で指導することを原則とする", "教員による体系的な説明を中心とした講義形式を基本とする", "定期テストや入学者選抜で求められる力の育成を中心に据える"],answer:0,explanation:"指導方法・指導体制の工夫改善と、個に応じた指導の充実が求められる。"},
  {id:"c191",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）で、指導と評価の関係として最も適切なものを選べ。",options:["指導と評価の一体化を図り、生徒の学習改善と教師の指導改善につなげる", "指導と評価は独立した営みとして、それぞれ独自に実施することとする", "評価は学期末や年度末など区切りの時期にまとめて実施することとする", "評価は成績の算出や評定のためのみに行う客観的な営みとして位置付ける"],answer:0,explanation:"指導と評価は一体化され、指導改善・学習改善のサイクルを回すことが求められる。"},
  {id:"c192",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「指導計画の作成と内容の取扱い」で、障害のある生徒への指導について最も適切なものを選べ。",options:["生徒の障害の状態等に応じた指導内容や指導方法の工夫を組織的・計画的に行う", "障害のある生徒については別のクラス編成による指導を原則とする", "障害の有無にかかわらず学級全体に同じ内容と方法の指導を行う", "障害のある生徒については指導内容を簡略化して個別に対応する"],answer:0,explanation:"障害のある生徒については、学習活動を行う場合に生じる困難さに応じた指導内容や指導方法の工夫を組織的・計画的に行うことが求められる。"},
  {id:"c193",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で、「目的や場面、状況などに応じて」という記述が強調されたことの意義として最も適切なものを選べ。",options:["形式的な言語練習ではなく、実際のコミュニケーションを想定した使用を重視するため", "中学校段階で扱う言語活動の難易度を全体的に引き上げるため", "文法事項の体系的な指導を場面や状況に即して行うことを重視するため", "各種試験や入学者選抜で問われる形式への対応力を育成するため"],answer:0,explanation:"目的・場面・状況に応じた言語使用の強調は、形式練習と言語活動を明確に区別し、実際のコミュニケーションに近い経験を重視するため。"},
  {id:"c194",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）での「即興性」重視の背景として最も適切なものを選べ。",options:["実際のコミュニケーションではあらかじめ用意した内容だけでは対応できず、その場で応答する力が必要なため", "即興的な発話は形式化しやすく、各種試験で客観的に測定しやすいため", "事前の準備を要しないため、限られた授業時数を効率的に活用できるため", "場面に応じて言語材料を想起する力を育て、記憶の定着量を増やすため"],answer:0,explanation:"実際のやり取りでは、相手の発言に即応する力が不可欠。これを中学校段階から育てることが重要視された。"},
  {id:"c195",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で新しく示された「CAN-DO」を意識した目標の趣旨として最も適切なものを選べ。",options:["生徒が英語で何ができるかを具体的に示し、目標を共有できるようにする", "学習評価の観点と規準を統一し、評価の手続きを簡素化するため", "各種試験や学力調査における出題範囲を明示し、試験対応を容易にするため", "学期末や年度末の評定を数値化しやすい形で客観的に算出するため"],answer:0,explanation:"CAN-DO形式の目標は、学習者が英語で何ができるかを具体的に示し、目標の明確化・共有化を図る。"},
  {id:"c196",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、指導の配慮事項として「繰り返し」の扱いとして最も適切なものを選べ。",options:["指導する語彙・表現等は、意味のある文脈でのコミュニケーションの中で繰り返し触れる", "定着を確認するため同じ形式の文法問題を繰り返し解かせる", "同じ英文の和訳を繰り返し行い、日本語との対応を定着させる", "同じ発音パターンを繰り返し練習し、音声の正確さを身に付けさせる"],answer:0,explanation:"言語材料は、意味のある文脈でのコミュニケーションの中で繰り返し触れることで定着が図られる。"},
  {id:"c197",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）解説で、「意見の交換」を通じて生徒が伸ばす力として最も適切なものを選べ。",options:["他者の意見を踏まえて自分の考えを伝える力、情報を整理して論理的に表現する力", "やり取りに必要な定型表現を記憶し、場面に応じて再生する力", "英文を的確に日本語に置き換えて意味を伝える和訳の力", "文法事項を支える文法用語の定義についての体系的な知識"],answer:0,explanation:"意見交換を通じて、他者の意見を踏まえた応答力、情報整理・論理的表現力などが育つ。"},
  {id:"c198",category:"guideline",subcategory:"指導計画",question:"中学校学習指導要領（外国語）「内容の取扱い」で、学習の個別化・協働化の観点として最も適切なものを選べ。",options:["ペア・グループワーク等の学習形態の工夫と、個別の支援の両立", "教員による体系的な説明を中心とした講義形式のみを用いる", "生徒一人一人の習熟度に応じた個別学習の形態のみを用いる", "複数人による協働的な学習としてグループワークのみを用いる"],answer:0,explanation:"ペア・グループワーク等の協働的な学習と、個に応じた指導の両方が求められる。"},
  {id:"c199",category:"guideline",subcategory:"改訂のポイント",question:"今回改訂の中学校学習指導要領（外国語）で、「聞くこと」「読むこと」「話すこと」「書くこと」の4技能に対応する指導のあり方として最も適切なものを選べ。",options:["4技能をバランスよく、統合的に育成する", "音声面の指導を優先し、聞くこと・話すことを中心に育成する", "言語知識の定着を優先し、読むこと・書くことを中心に育成する", "学習段階に応じて一技能ずつ順に取り上げて育成することとする"],answer:0,explanation:"5領域すべてをバランスよく、かつ統合的に育成することが今回改訂の方針。従来読み書き偏重への反省を踏まえた。"},
  {id:"c200",category:"guideline",subcategory:"改訂のポイント",question:"中学校学習指導要領（外国語）全体を通じて一貫して貫かれている理念として最も適切なものを選べ。",options:["コミュニケーションを図る資質・能力を、実際の言語活動を通して育成すること", "中学校段階で扱う文法事項の体系的な習得を確実に図ること", "語彙や表現を繰り返し練習して確実に定着させる暗記中心の学習", "日本語と英語の対応関係を理解し的確な翻訳力を育成すること"],answer:0,explanation:"指導要領全体を貫く理念は、コミュニケーションを図る資質・能力を、実際の言語活動を通して育成することにある。"},
];

// ── サブカテゴリ定義 ───────────────────────────────
const SUBCATS = {
  grammar: [
    { id: "時制", label: "時制", icon: "⏱" },
    { id: "助動詞", label: "助動詞", icon: "⚙" },
    { id: "仮定法", label: "仮定法", icon: "🌀" },
    { id: "受動態", label: "受動態", icon: "↔" },
    { id: "不定詞", label: "不定詞", icon: "→" },
    { id: "動名詞", label: "動名詞", icon: "∞" },
    { id: "分詞", label: "分詞", icon: "✂" },
    { id: "関係詞", label: "関係詞", icon: "🔗" },
    { id: "比較", label: "比較", icon: "⚖" },
    { id: "接続詞", label: "接続詞", icon: "•—•" },
    { id: "前置詞", label: "前置詞", icon: "📍" },
    { id: "名詞", label: "名詞", icon: "N" },
    { id: "冠詞", label: "冠詞", icon: "a/the" },
    { id: "代名詞", label: "代名詞", icon: "🙂" },
    { id: "形容詞・副詞", label: "形容詞・副詞", icon: "✨" },
    { id: "語彙", label: "語彙", icon: "📖" },
    { id: "イディオム", label: "イディオム", icon: "💬" },
    { id: "構文", label: "構文", icon: "🏗" },
    { id: "語法", label: "語法", icon: "✏" },
  ],
  guideline: [
    { id: "教科目標", label: "教科目標", icon: "🎯" },
    { id: "5領域", label: "5領域の目標", icon: "🔑" },
    { id: "内容・知識技能", label: "内容・知識技能", icon: "📚" },
    { id: "音声", label: "音声", icon: "🔊" },
    { id: "符号", label: "符号", icon: "。、" },
    { id: "語・連語・慣用表現", label: "語・連語・慣用表現", icon: "💬" },
    { id: "文構造・文法", label: "文構造・文法", icon: "🧩" },
    { id: "思考力等", label: "思考力・判断力・表現力", icon: "💡" },
    { id: "言語活動", label: "言語活動", icon: "🗣" },
    { id: "言語の働き", label: "言語の働き", icon: "⚙" },
    { id: "言語使用場面", label: "言語使用場面", icon: "🏞" },
    { id: "指導計画", label: "指導計画・内容の取扱い", icon: "📋" },
    { id: "小中高接続", label: "小中高接続", icon: "↕" },
    { id: "授業時数", label: "授業時数", icon: "⏱" },
    { id: "改訂のポイント", label: "改訂のポイント", icon: "✨" },
  ],
};

const CATEGORY_META = {
  grammar: { label: "文法・語法", color: "#7eb8d4", total: 200 },
  guideline: { label: "中学英語 学習指導要領", color: "#d4a4c8", total: 200 },
};

// ── メインコンポーネント ──────────────────────────────────
export default function Page() {
  const [screen, setScreen] = useState("home"); // home | category | quiz | result
  const [selectedCat, setSelectedCat] = useState("grammar");
  const [selectedSub, setSelectedSub] = useState("all");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExp, setShowExp] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [weak, setWeak] = useState(new Set());
  const [quizSize, setQuizSize] = useState(10);

  // サブカテゴリ別問題数カウント
  const subcatCounts = useMemo(() => {
    const counts = { grammar: {}, guideline: {} };
    QUESTIONS.forEach(q => {
      if (!counts[q.category][q.subcategory]) counts[q.category][q.subcategory] = 0;
      counts[q.category][q.subcategory]++;
    });
    return counts;
  }, []);

  const shuffleOptions = (q) => {
    const indices = q.options.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      ...q,
      options: indices.map(i => q.options[i]),
      answer: indices.indexOf(q.answer),
    };
  };

  const startQuiz = (cat, sub, size) => {
    let qs = QUESTIONS.filter(q => q.category === cat);
    if (sub !== "all") qs = qs.filter(q => q.subcategory === sub);
    qs = [...qs].sort(() => Math.random() - 0.5).slice(0, size).map(shuffleOptions);
    setQuestions(qs);
    setCurrent(0); setSelected(null); setShowExp(false); setAnswers([]);
    setScreen("quiz");
  };

  const startWeak = () => {
    const weakQ = QUESTIONS.filter(q => weak.has(q.id)).sort(() => Math.random() - 0.5).map(shuffleOptions);
    if (weakQ.length === 0) return;
    setQuestions(weakQ);
    setCurrent(0); setSelected(null); setShowExp(false); setAnswers([]);
    setScreen("quiz");
  };

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExp(true);
    const q = questions[current];
    const isCorrect = idx === q.answer;
    setAnswers(prev => [...prev, { id: q.id, correct: isCorrect, question: q, selectedIdx: idx }]);
    if (!isCorrect) setWeak(prev => new Set([...prev, q.id]));
    else setWeak(prev => { const n = new Set(prev); n.delete(q.id); return n; });
  };

  const next = () => {
    if (current + 1 >= questions.length) { setScreen("result"); return; }
    setCurrent(c => c + 1); setSelected(null); setShowExp(false);
  };

  const score = answers.filter(a => a.correct).length;
  const q = questions[current];

  // ── スタイル ──
  const styles = {
    app: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f1923 0%, #1a2a3a 50%, #0f1923 100%)",
      fontFamily: "'Georgia', 'Noto Serif JP', serif",
      color: "#e8d5b7",
      position: "relative",
    },
    container: { position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "24px 16px" },

    header: { textAlign: "center", marginBottom: 32 },
    badge: {
      display: "inline-block", background: "rgba(232,213,183,0.12)",
      border: "1px solid rgba(232,213,183,0.3)", borderRadius: 4,
      padding: "4px 12px", fontSize: 11, letterSpacing: 3,
      color: "#c4a882", marginBottom: 16, textTransform: "uppercase",
    },
    title: { fontSize: 26, fontWeight: "bold", lineHeight: 1.3, margin: "0 0 8px", color: "#f0dfc0" },
    subtitle: { fontSize: 13, color: "#8a9aaa", letterSpacing: 1 },

    // カテゴリ大カード
    bigCatGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 },
    bigCatCard: (color) => ({
      background: "rgba(255,255,255,0.04)",
      border: `1px solid rgba(255,255,255,0.08)`,
      borderLeft: `3px solid ${color}`,
      borderRadius: 12, padding: "24px 16px", cursor: "pointer",
      transition: "all 0.2s",
    }),
    bigCatLabel: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#f0dfc0" },
    bigCatCount: { fontSize: 12, color: "#8a9aaa" },

    // サブカテゴリグリッド
    subcatBack: {
      background: "transparent", border: "1px solid rgba(232,213,183,0.3)",
      color: "#e8d5b7", padding: "8px 14px", borderRadius: 20, fontSize: 12,
      cursor: "pointer", marginBottom: 16,
    },
    subcatHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 4, color: "#f0dfc0" },
    subcatDesc: { fontSize: 12, color: "#8a9aaa", marginBottom: 20 },
    subcatGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, marginBottom: 20 },
    subcatCard: {
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 10, padding: "14px 12px", cursor: "pointer",
      transition: "all 0.2s",
    },
    subcatLabel: { fontSize: 12, fontWeight: "bold", color: "#e8d5b7", marginBottom: 2 },
    subcatCount: { fontSize: 10, color: "#6a7a8a" },

    sizeBox: {
      background: "rgba(232,213,183,0.06)", border: "1px solid rgba(232,213,183,0.2)",
      borderRadius: 10, padding: "14px", marginBottom: 16,
    },
    sizeLabel: { fontSize: 11, color: "#c4a882", marginBottom: 10, letterSpacing: 2, textTransform: "uppercase" },
    sizeOptions: { display: "flex", gap: 8 },
    sizeOpt: (active) => ({
      flex: 1, padding: "10px", borderRadius: 8,
      background: active ? "rgba(232,213,183,0.2)" : "rgba(255,255,255,0.02)",
      border: active ? "1px solid rgba(232,213,183,0.5)" : "1px solid rgba(255,255,255,0.08)",
      color: "#e8d5b7", fontSize: 13, cursor: "pointer",
    }),
    startBtn: {
      width: "100%", background: "linear-gradient(135deg, #c4a882 0%, #a08860 100%)",
      color: "#0f1923", border: "none", borderRadius: 10, padding: "16px",
      fontSize: 15, fontWeight: "bold", letterSpacing: 1, cursor: "pointer",
    },

    weakBox: {
      marginTop: 24, padding: 14, borderRadius: 10,
      background: "rgba(200,100,80,0.06)", border: "1px solid rgba(200,100,80,0.2)",
    },
    weakText: { fontSize: 12, color: "#d49c8a", marginBottom: 10 },
    weakBtn: {
      width: "100%", background: "transparent",
      border: "1px solid rgba(200,100,80,0.4)", borderRadius: 8,
      color: "#e8a88a", padding: "10px", fontSize: 13, cursor: "pointer",
    },

    // クイズ画面
    progressBar: {
      height: 3, background: "rgba(232,213,183,0.1)", borderRadius: 2,
      marginBottom: 16, overflow: "hidden",
    },
    progressFill: (pct) => ({
      height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #c4a882, #e8d5b7)",
      transition: "width 0.3s",
    }),
    progressText: { fontSize: 11, color: "#8a9aaa", textAlign: "center", marginBottom: 16, letterSpacing: 2 },

    subcatTag: {
      display: "inline-block", background: "rgba(232,213,183,0.1)",
      border: "1px solid rgba(232,213,183,0.2)", borderRadius: 4,
      padding: "3px 10px", fontSize: 10, color: "#c4a882",
      marginBottom: 16, letterSpacing: 1,
    },
    questionBox: {
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: "20px", marginBottom: 16,
      whiteSpace: "pre-wrap", fontSize: 15, lineHeight: 1.7,
    },
    option: (state) => ({
      display: "block", width: "100%", textAlign: "left",
      padding: "14px 16px", marginBottom: 8, borderRadius: 10,
      cursor: state === "default" ? "pointer" : "default",
      background: state === "correct" ? "rgba(130,201,160,0.15)"
                : state === "wrong" ? "rgba(216,122,106,0.15)"
                : "rgba(255,255,255,0.03)",
      border: state === "correct" ? "1px solid rgba(130,201,160,0.5)"
            : state === "wrong" ? "1px solid rgba(216,122,106,0.5)"
            : "1px solid rgba(255,255,255,0.1)",
      color: "#e8d5b7", fontSize: 14, transition: "all 0.2s",
      fontFamily: "inherit",
    }),
    optLabel: { fontWeight: "bold", color: "#c4a882", marginRight: 10 },

    expBox: {
      background: "rgba(126,184,212,0.08)", border: "1px solid rgba(126,184,212,0.3)",
      borderRadius: 10, padding: "14px", marginTop: 12, marginBottom: 16,
    },
    expLabel: { fontSize: 10, color: "#7eb8d4", letterSpacing: 2, marginBottom: 6, textTransform: "uppercase" },
    expText: { fontSize: 13, lineHeight: 1.7, color: "#c4d4e4" },

    nextBtn: {
      width: "100%", background: "rgba(232,213,183,0.9)", color: "#0f1923",
      border: "none", borderRadius: 10, padding: "14px", fontSize: 14,
      fontWeight: "bold", cursor: "pointer", letterSpacing: 1,
    },

    // 結果画面
    resultCard: {
      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12, padding: "32px 20px", textAlign: "center", marginBottom: 16,
    },
    resultScore: { fontSize: 60, fontWeight: "bold", color: "#f0dfc0", lineHeight: 1 },
    resultTotal: { fontSize: 16, color: "#8a9aaa", margin: "8px 0 20px" },
    resultPct: { fontSize: 14, color: "#c4a882", letterSpacing: 2 },
    resultMsg: { fontSize: 13, color: "#8a9aaa", marginTop: 12, lineHeight: 1.6 },

    reviewList: { marginBottom: 16 },
    reviewItem: (correct) => ({
      background: "rgba(255,255,255,0.03)",
      borderLeft: `2px solid ${correct ? "#82c9a0" : "#d87a6a"}`,
      padding: "10px 12px", marginBottom: 6, borderRadius: 4,
      fontSize: 12, color: "#c4a882",
    }),

    homeBtn: {
      width: "100%", background: "transparent",
      border: "1px solid rgba(232,213,183,0.4)", color: "#e8d5b7",
      borderRadius: 10, padding: "12px", fontSize: 13, cursor: "pointer",
    },
    footer: { textAlign: "center", fontSize: 11, color: "#6a7a8a", marginTop: 32, letterSpacing: 1 },
  };

  // ═══════════════ HOME ═══════════════
  if (screen === "home") {
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={styles.header}>
            <div style={styles.badge}>Miyazaki Teacher Exam</div>
            <h1 style={styles.title}>宮崎県 中学英語<br/>教採対策トレーナー</h1>
            <div style={styles.subtitle}>Grammar 200 + Curriculum 200 = 400 questions</div>
          </div>

          <div style={styles.bigCatGrid}>
            {Object.entries(CATEGORY_META).map(([key, meta]) => (
              <div key={key} style={styles.bigCatCard(meta.color)}
                   onClick={() => { setSelectedCat(key); setScreen("category"); }}>
                <div style={styles.bigCatLabel}>{meta.label}</div>
                <div style={styles.bigCatCount}>{meta.total}問</div>
              </div>
            ))}
          </div>

          {weak.size > 0 && (
            <div style={styles.weakBox}>
              <div style={styles.weakText}>苦手問題：{weak.size}問</div>
              <button style={styles.weakBtn} onClick={startWeak}>
                苦手問題を復習する →
              </button>
            </div>
          )}

          <div style={styles.footer}>
            宮崎県公立学校教員採用選考試験・中学校英語　想定対策問題集<br/>
            — 試験本番の攻略に向けて —
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════ CATEGORY / SUBCATEGORY SELECT ═══════════════
  if (screen === "category") {
    const meta = CATEGORY_META[selectedCat];
    const subs = SUBCATS[selectedCat];
    const totalForSub = selectedSub === "all"
      ? meta.total
      : subcatCounts[selectedCat][selectedSub] || 0;

    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <button style={styles.subcatBack} onClick={() => setScreen("home")}>← ホームへ</button>

          <div style={styles.subcatHeader}>{meta.label}</div>
          <div style={styles.subcatDesc}>分野を選んで学習を開始</div>

          <div style={styles.subcatGrid}>
            <div style={{...styles.subcatCard,
                        background: selectedSub === "all" ? "rgba(232,213,183,0.15)" : "rgba(255,255,255,0.04)",
                        borderColor: selectedSub === "all" ? "rgba(232,213,183,0.4)" : "rgba(255,255,255,0.08)",
                        gridColumn: "1 / -1"}}
                 onClick={() => setSelectedSub("all")}>
              <div style={styles.subcatLabel}>◎ すべての分野</div>
              <div style={styles.subcatCount}>{meta.total}問</div>
            </div>
            {subs.map(s => {
              const c = subcatCounts[selectedCat][s.id] || 0;
              if (c === 0) return null;
              const active = selectedSub === s.id;
              return (
                <div key={s.id} style={{...styles.subcatCard,
                                       background: active ? "rgba(232,213,183,0.15)" : "rgba(255,255,255,0.04)",
                                       borderColor: active ? "rgba(232,213,183,0.4)" : "rgba(255,255,255,0.08)"}}
                     onClick={() => setSelectedSub(s.id)}>
                  <div style={styles.subcatLabel}>{s.icon} {s.label}</div>
                  <div style={styles.subcatCount}>{c}問</div>
                </div>
              );
            })}
          </div>

          <div style={styles.sizeBox}>
            <div style={styles.sizeLabel}>出題数</div>
            <div style={styles.sizeOptions}>
              {[10, 20, 50, totalForSub].filter((v,i,a) => v <= totalForSub && a.indexOf(v) === i).map(n => (
                <button key={n} style={styles.sizeOpt(quizSize === n)}
                        onClick={() => setQuizSize(n)}>
                  {n === totalForSub && n > 50 ? `全${n}` : `${n}問`}
                </button>
              ))}
            </div>
          </div>

          <button style={styles.startBtn}
                  onClick={() => startQuiz(selectedCat, selectedSub, Math.min(quizSize, totalForSub))}>
            学習をスタート →
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════ QUIZ ═══════════════
  if (screen === "quiz" && q) {
    const pct = ((current + 1) / questions.length) * 100;
    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={styles.progressBar}>
            <div style={styles.progressFill(pct)} />
          </div>
          <div style={styles.progressText}>
            {current + 1} / {questions.length}
          </div>

          <span style={styles.subcatTag}>{q.subcategory}</span>

          <div style={styles.questionBox}>{q.question}</div>

          {q.options.map((opt, i) => {
            const isAns = i === q.answer;
            const isSelected = selected === i;
            let state = "default";
            if (showExp && isAns) state = "correct";
            else if (showExp && isSelected && !isAns) state = "wrong";
            return (
              <button key={i} style={styles.option(state)}
                      onClick={() => handleSelect(i)}
                      disabled={selected !== null}>
                <span style={styles.optLabel}>{String.fromCharCode(65 + i)}</span>
                {opt}
              </button>
            );
          })}

          {showExp && (
            <div style={styles.expBox}>
              <div style={styles.expLabel}>解説</div>
              <div style={styles.expText}>{q.explanation}</div>
            </div>
          )}

          {showExp && (
            <button style={styles.nextBtn} onClick={next}>
              {current + 1 >= questions.length ? "結果を見る" : "次の問題へ"} →
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════ RESULT ═══════════════
  if (screen === "result") {
    const pct = Math.round((score / questions.length) * 100);
    const msg = pct >= 90 ? "素晴らしい実力です。本番でも自信を持って臨めます。"
              : pct >= 70 ? "良いペースです。もう一歩で合格ラインへ。"
              : pct >= 50 ? "基礎は入っています。苦手分野を集中的に。"
              : "弱点を洗い出し、繰り返し学習しましょう。";

    return (
      <div style={styles.app}>
        <div style={styles.container}>
          <div style={styles.resultCard}>
            <div style={styles.resultScore}>{score}</div>
            <div style={styles.resultTotal}>/ {questions.length} 問正解</div>
            <div style={styles.resultPct}>正答率 {pct}%</div>
            <div style={styles.resultMsg}>{msg}</div>
          </div>

          <div style={{fontSize: 11, color: "#8a9aaa", margin: "16px 0 8px", letterSpacing: 2, textTransform: "uppercase"}}>
            解答内訳
          </div>
          <div style={styles.reviewList}>
            {answers.map((a, i) => (
              <div key={i} style={styles.reviewItem(a.correct)}>
                Q{i + 1}. {a.question.subcategory} — {a.correct ? "○ 正解" : `✕ 不正解（正解: ${String.fromCharCode(65 + a.question.answer)}）`}
              </div>
            ))}
          </div>

          <button style={styles.homeBtn} onClick={() => setScreen("home")}>
            ホームに戻る
          </button>
        </div>
      </div>
    );
  }

  return null;
}
