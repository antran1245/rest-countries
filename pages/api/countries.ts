import { NextApiRequest, NextApiResponse } from "next";
import Countries from "../interface/Countries";

export default async function countries(req : NextApiRequest, res : NextApiResponse<Countries>) {
  const {url} = JSON.parse(req.body)
  const response = await fetch(`https://restcountries.com${url}`)
  const data = await response.json()
  res.status(200).json(data)
}