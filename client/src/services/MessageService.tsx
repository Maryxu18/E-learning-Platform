import { getID } from "../models/User";

export async function getAllConversations() {
  const response = await fetch(
    `http://localhost:3000/conversationUser${getID()}`,
    {
      method: "GET",
    }
  );
  if (response.status === 200) {
    const data = await response.json();
    return formatConversationList({ conversations: data.data });
  } else if (response.status === 404) {
    alert("Not found!");
  }
  // return formatConversationList({ conversations });
}

export function formatConversationList({
  conversations,
}: {
  conversations: any;
}) {
  const conversationList = [];
  if (conversations) {
    for (let i = 0; i < conversations.length; i++) {
      const members = conversations[i].members.filter(
        (item) => item.id !== getID() //test, replace with getID()
      );
      conversationList.push({
        _id: conversations[i]._id,
        members: members,
        lastMessage: conversations[i].lastMessage,
        updatedAt: conversations[i].updatedAt,
      });
    }
  }
  const byUpdateAt = conversationList.slice(0);
  byUpdateAt.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  // return conversationList;
  return byUpdateAt;
}
export async function getCurrentConversation({
  conversationId,
}: {
  conversationId: string;
}) {
  if (conversationId !== "") {
    const response = await fetch(
      `http://localhost:3000/conversation${conversationId}`,
      {
        method: "GET",
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    } else if (response.status === 404) {
      alert("Not found!");
    }
  }
  // return messages;
}

export async function addNewMessage({
  newMessage,
  conversationId,
}: {
  newMessage: string;
  conversationId: string;
}) {
  const response = await fetch(
    `http://localhost:3000/conversation${conversationId}/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: getID(), //test, replace with getID()
        message: newMessage,
      }),
    }
  );
  if (response.status !== 200 && response.status !== 201) {
    alert("Error");
  }
}

export async function addNewConversation({
  receiverId,
}: {
  receiverId: string;
}) {
  const response = await fetch(`http://localhost:3000/conversation/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: getID(),
      receiverId: receiverId,
    }),
  });
  if (response.status !== 200 && response.status !== 201) {
    alert("Error");
  }
}
