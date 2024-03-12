import express from 'npm:express'
import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import cors from 'npm:cors'
const app = express()
app.use(express.json())

app.use(cors())

const supUrl = Deno.env.get("SUPABASE_URL") as string;
const supKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;
console.log(supUrl, supKey)
const supabase = createClient(supUrl, supKey);

app.get('/meals/:userId', async (req, res) => {
  // get userid form request
  const userid = req.params.userId;
  try {
    const { data, error } = await supabase.from('Meals').select('*').eq('userid', userid);
    res.set('Access-Control-Allow-Origin', '*').status(200).json({
      meals: data,
    })
  } catch (error) {
    res.status(500).json({ error })
  }

})

app.post('/meals', async (req, res) => {
  const { userid, name, description, imageurl, date } = req.body
  // get userid form request
  try {
    const { data, error } = await supabase.from('Meals').insert({ name, description, imageurl, userid, date }).select('*');
    res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', }).status(201).json({
      data,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})
app.put('/meals', async (req, res) => {
  const { mealid, name, description, imageurl } = req.body
  try {
    const { data, error } = await supabase
      .from('Meals')
      .update({ name, description, imageurl })
      .eq('id', mealid)
      .select()
    res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', }).status(201).json({
      data,
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})
app.delete('/meals', async (req, res) => {
  const { mealid } = req.body
  try {
    const { error } = await supabase
      .from('Meals')
      .delete()
      .eq('id', mealid)
    res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', }).status(201).json({
      "status": 204,
      "statusText": "No Content",
    })
  } catch (error) {
    res.status(500).json({ error })
  }
})
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
