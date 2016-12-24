// @flow

export type PostId = string;
export type Post = {
  id: PostId,
  title: string,
  body: string,
};

const POSTS = {
  list: ['0', '1', '2', '3', '4'],
  entities: {
    '0': {
      id: '0',
      title: 'Apple #1',
      body: `<p>One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " he thought. It wasn't a dream.</p>
             <p>His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered the whole of her lower arm towards the viewer. Gregor then turned to look out the window at the dull weather.</p>`
    },
    '1': {
      id: '1',
      title: 'Banana #2',
      body: `<p>Drops of rain could be heard hitting the pane, which made him feel quite sad. "How about if I sleep a little bit longer and forget all this nonsense", he thought, but that was something he was unable to do because he was used to sleeping on his right, and in his present state couldn't get into that position. However hard he threw himself onto his right, he always rolled back to where he was. He must have tried it a hundred times, shut his eyes so that he wouldn't have to look at the floundering legs, and only stopped when he began to feel a mild, dull pain there that he had never felt before.</p>
             <p>"Oh, God", he thought, "what a strenuous career it is that I've chosen! Travelling day in and day out. Doing business like this takes much more effort than doing your own business at home, and on top of that there's the curse of travelling, worries about making train connections, bad and irregular food, contact with different people all the time so that you can never get to know anyone or become friendly with them. It can all go to Hell!</p>`,
    },
    '2': {
      id: '2',
      title: 'Cinnamon #3',
      body: `<p>" He felt a slight itch up on his belly; pushed himself slowly up on his back towards the headboard so that he could lift his head better; found where the itch was, and saw that it was covered with lots of little white spots which he didn't know what to make of; and when he tried to feel the place with one of his legs he drew it quickly back because as soon as he touched it he was overcome by a cold shudder. He slid back into his former position. "Getting up early all the time", he thought, "it makes you stupid. You've got to get enough sleep. Other travelling salesmen live a life of luxury.</p>
             <p>For instance, whenever I go back to the guest house during the morning to copy out the contract, these gentlemen are always still sitting there eating their breakfasts. I ought to just try that with my boss; I'd get kicked out on the spot. But who knows, maybe that would be the best thing for me. If I didn't have my parents to think about I'd have given in my notice a long time ago, I'd have gone up to the boss and told him just what I think, tell him everything I would, let him know just what I feel. He'd fall right off his desk!</p>`,
    },
    '3': {
      id: '3',
      title: 'Date #4',
      body: `<p>And it's a funny sort of business to be sitting up there at your desk, talking down at your subordinates from up there, especially when you have to go right up close because the boss is hard of hearing. Well, there's still some hope; once I've got the money together to pay off my parents' debt to him - another five or six years I suppose - that's definitely what I'll do. That's when I'll make the big change. First of all though, I've got to get up, my train leaves at five. " And he looked over at the alarm clock, ticking on the chest of drawers. "God in Heaven! " he thought.</p>
             <p>It was half past six and the hands were quietly moving forwards, it was even later than half past, more like quarter to seven. Had the alarm clock not rung? He could see from the bed that it had been set for four o'clock as it should have been; it certainly must have rung. Yes, but was it possible to quietly sleep through that furniture-rattling noise? True, he had not slept peacefully, but probably all the more deeply because of that. What should he do now? The next train went at seven; if he were to catch that he would have to rush like mad and the collection of samples was still not packed, and he did not at all feel particularly fresh and lively.</p>`,
    },
    '4': {
      id: '4',
      title: 'Elderberry #5',
      body: `<p>And even if he did catch the train he would not avoid his boss's anger as the office assistant would have been there to see the five o'clock train go, he would have put in his report about Gregor's not being there a long time ago. The office assistant was the boss's man, spineless, and with no understanding. What about if he reported sick? But that would be extremely strained and suspicious as in fifteen years of service Gregor had never once yet been ill. His boss would certainly come round with the doctor from the medical insurance company, accuse his parents of having a lazy son, and accept the doctor's recommendation not to make any claim as the doctor believed that no-one was ever ill but that many were workshy.</p>
             <p>And what's more, would he have been entirely wrong in this case? Gregor did in fact, apart from excessive sleepiness after sleeping for so long, feel completely well and even felt much hungrier than usual. One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What's happened to me? " he thought. It wasn't a dream. His room, a proper human room although a little too small, lay peacefully between its four familiar walls. A collection of textile samples lay spread out on the table - Samsa was a travelling salesman - and above it there hung a picture that he had recently cut out of an illustrated magazine and housed in a nice, gilded frame. It showed a lady fitted out with a fur hat and fur boa who sat upright, raising a heavy fur muff that covered</p>`,
    },
  },
};

export type ResponseData = {
  data: {
    list: Array<PostId>,
    entities: { [PostId]: Post },
  }
};

function response(data): Promise<ResponseData> {
  return new Promise(resolve => {
    // Simulate communication delay
    setTimeout(() => {
      resolve(data);
    }, 1500);
  });
}

function toObj(pairs) {
  return pairs.reduce((p, [k, v]) => ({ ...p, [k]: v }), {});
}

export type QueryParams = {
  q?: string,
  page?: number,
  limit?: number,
};

export const posts = {
  all({ q, page = 1, limit = 2 }: QueryParams = {}) {
    const offset = (page - 1) * limit;

    // Enumerate id of condidate pages
    let ids;
    if (typeof q !== 'undefined') {
      q = q.toLowerCase();
      ids = POSTS.list
        .map(id => POSTS.entities[id])
        .filter(post => post.title.toLowerCase().indexOf(q) !== -1)
        .map(post => post.id);
    } else {
      ids = POSTS.list;
    }

    // Paging
    ids = ids.slice(offset, offset + limit);

    return response({
      data: {
        list: ids,
        entities: toObj(ids.map(id => ([id, POSTS.entities[id]])))
      }
    });
  },
  one(id: PostId) {
    return response({
      data: {
        list: [id],
        entities: { [id]: POSTS.entities[id] }
      } 
    });
  },
  update({ id, title, body }: Post) {
    POSTS.entities[id] = { id, title, body };
    return posts.one(id);
  },
};
