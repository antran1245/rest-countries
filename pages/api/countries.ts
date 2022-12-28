import { NextApiRequest, NextApiResponse } from "next";
import { Countries } from "../interface/Countries";

export default async function countries(req : NextApiRequest, res : NextApiResponse<Countries>) {
  console.log(req.body)
  const response = await fetch('https://restcountries.com/v3.1/all')
  const data = await response.json()
  res.status(200).json(data)
}