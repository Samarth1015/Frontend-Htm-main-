import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/Model/user";
import { Checklist } from "@mui/icons-material";

export async function POST(req) {
  await dbConnect();
  let { email } = await req.json();
  console.log(email);
  let checkUser = await User.find({ email: email });
  // console.log(checkUser);
  if (checkUser.length && checkUser) {
    console.log("user already exist");
    return NextResponse.json(checkUser);
  } else if (email) {
    let newuser = new User({
      email: email,
      totalQuestion: 0,
      right: 0,
      wrong: 0,
    });

    await newuser.save();
    let user = await User.find({ email: email });
    console.log(user);
    console.log("new user created");

    return NextResponse.json(user);
  }
}
