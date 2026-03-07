import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import https from 'https'
import http from 'http'
import { createReadStream } from 'fs'

const client = createClient({
  projectId: '2bom5gqg',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN,
})

const PUBLIC_DIR = '/Users/kevinwhite/Sites/the-kohler-group/public'

function fetchImageBuffer(imageUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(imageUrl)
    const protocol = url.protocol === 'https:' ? https : http
    protocol.get(imageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return fetchImageBuffer(res.headers.location).then(resolve).catch(reject)
      }
      const chunks = []
      res.on('data', chunk => chunks.push(chunk))
      res.on('end', () => resolve({ buffer: Buffer.concat(chunks), contentType: res.headers['content-type'] || 'image/jpeg' }))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function uploadLocalImage(localPath, filename) {
  const stream = createReadStream(localPath)
  return await client.assets.upload('image', stream, { filename })
}

async function uploadRemoteImage(url, filename) {
  const { buffer, contentType } = await fetchImageBuffer(url)
  return await client.assets.upload('image', buffer, { filename, contentType })
}

const THERAPISTS = [
  {
    name: 'Kaylie Sargent Ysasi',
    credentials: 'MS, LCMHCA, NCC',
    role: 'Telehealth Therapist',
    headshot: { remote: 'https://static.wixstatic.com/media/2e5b58_7f9c63fc251a4c5b829b767a322991ad~mv2.png', filename: 'therapist-kaylie-sargent-ysasi.png' },
    order: 1,
    intro: 'Kaylie is a Licensed Clinical Mental Health Counselor Associate (LCMHCA) through the NC Board of Licensed Clinical Mental Health Counselors. She received her BS in Recreational Therapy from ECU and her MS in Clinical Counseling from ECU. Kaylie also earned special certifications in Rehabilitation Counseling, and Military & Trauma Counseling.',
    specializations: ['Anxiety', 'Depression', 'Trauma', 'Stress', 'Emotional Regulation', 'Self-esteem', 'Life Transitions'],
    modalities: ['Cognitive Behavioral Therapy (CBT)', 'Person-Centered Therapy', 'Redecision Therapy (in training)', 'Biblical Principles'],
  },
  {
    name: 'Nancy Csehoski',
    credentials: 'LCMHC, TF-CBT',
    role: 'Seeing clients in person in Huntersville and via telehealth in NC',
    headshot: { remote: 'https://static.wixstatic.com/media/2e5b58_b064d84644f04f1493336da062582bcd~mv2.jpg', filename: 'therapist-nancy-csehoski.jpg' },
    order: 2,
    intro: 'Mrs. Nancy Csehoski is a Licensed Clinical Mental Health Counselor (LCMHC). She received her Bachelor of Arts degree from Marshall University and her Masters degree from Marshall University.',
    specializations: ['Trauma', 'TF-CBT', 'Inappropriate Sexualized Behavior in Youth', 'Anxiety', 'Depression', 'Grief & Loss', 'Anger', 'Self-esteem', 'Personal Identity'],
    modalities: ['Trauma-Focused CBT', 'Mindfulness', 'Motivational Interviewing', 'Solution Focused Therapy', 'Gestalt Techniques'],
  },
  {
    name: 'April Morris',
    credentials: 'MS, NCC, LCMHCS',
    role: 'Clinical Director — Seeing clients in person in Huntersville and via telehealth in NC',
    headshot: { local: `${PUBLIC_DIR}/images/therapist-april-morris.png`, filename: 'therapist-april-morris.png' },
    order: 3,
    intro: 'Mrs. April Morris is a Licensed Clinical Mental Health Therapist and Supervisor. April is also a Licensed Professional Counselor for the State of South Carolina. She has 20 years of mental health experience.',
    specializations: ['Depression', 'Trauma', 'Anxiety', 'Anger', 'Relationship Problems', 'Communication', 'Mood Disturbances', 'Self-esteem', 'Personal Identity'],
    modalities: ['EMDR', 'Gottman Method (Level 1)', 'Redecision Therapy', 'Cognitive Behavioral Therapy', 'Client Centered Therapy'],
  },
  {
    name: 'Barbara J. Kohler',
    credentials: 'MS, CRC, LCMHC, NCC',
    role: 'Founder — Seeing clients in person in Huntersville and via telehealth in NC',
    headshot: { local: `${PUBLIC_DIR}/images/therapist-barbara-kohler.jpg`, filename: 'therapist-barbara-kohler.jpg' },
    order: 4,
    intro: 'Barbara Kohler is a Licensed Clinical Mental Health Counselor and Singer/Songwriter. Barbara uses a Christ centered approach in working with clients. Her primary techniques are Re-decision Therapy, TRET, and Heart Sync.',
    specializations: ['PTSD from Childhood or Adult Trauma', 'Therapy for Depression and Anxiety', 'Couples Counseling', 'Family Counseling', 'Grief Counseling', 'Suicidal Feelings', 'Mood Disorders', 'Self-esteem', 'Conflict Resolution', 'Spiritual Abuse'],
    modalities: ['Re-decision Therapy', 'Advanced Integrative Therapy (Certified)', 'Heart Sync', 'TRET (Trauma Resolution Energy Therapy)', 'Transformational Prayer Ministry', 'Splankna'],
  },
  {
    name: 'Karen C. Albrecht',
    credentials: 'MS, CRC, LCMHC, LCAS',
    role: 'Seeing clients via telehealth in NC',
    headshot: { local: `${PUBLIC_DIR}/images/therapist-karen-albrecht.jpg`, filename: 'therapist-karen-albrecht.jpg' },
    order: 5,
    intro: 'Karen C. Albrecht is a Licensed Clinical Mental Health Counselor, Licensed Clinical Addiction Specialist, and Certified Rehabilitation Counselor. She has over 19 years of experience.',
    specializations: ['Life Transitions & Adjustment Disorders', 'Grief', 'Divorce', 'Single Parenting', 'Addictions', 'Women\'s Issues', 'Childhood Abuse', 'Depression', 'Fear / Guilt / Shame', 'Elder Care'],
    modalities: ['Redecision Therapy', 'Cognitive Behavioral Therapy', 'Heart Sync', 'Solution-Focused Therapy'],
  },
  {
    name: 'Carrie Pitts',
    credentials: 'BA, MA, Licensure Pending',
    role: 'Full-Time Clinician (Licensure Pending)',
    headshot: { local: `${PUBLIC_DIR}/images/therapist-carrie-pitts.png`, filename: 'therapist-carrie-pitts.png' },
    order: 6,
    intro: 'Carrie brings valuable life and ministry experience. She has a deep desire to help women and children heal from trauma and abuse and is active in foster family care ministry.',
    specializations: ['Trauma', 'Abuse', "Women's Issues", "Children's Therapy", 'Mental Illness (Family Support)'],
    modalities: ['Sand Tray Therapy', 'Redecision Therapy', 'Cognitive Behavioral Therapy', 'Solution Focused Therapy', 'Internal Family Systems', 'Trauma-Focused CBT'],
  },
]

const TESTIMONIALS = [
  { service: 'Individual Intensive', quote: "The first time I came to see Barbara I was in desperate place. I had tried multiple other therapist's and types of counseling. Nothing was helping beyond essentially medicating the pain and trauma I was working through. By the time I reached her, it would've been similar to someone coming into the emergency room on a crash cart. Barely alive. I needed assistance to feed and dress myself and was not safe to drive a car. My first Intensive with Barbara put me on life support and gave me the first glimpse of Hope in many many months. I continued forward with her guidance and multiple Intensives to follow. I can honestly say that I am alive today as a result of her therapeutic techniques and work. I and my family will be forever grateful.", order: 1 },
  { service: 'Marriage Intensive', quote: 'Father used Barbara Kohler to bring much needed healing and deliverance in our lives. In 38 years of marriage, our week with Barbara was one of the most impactful weeks of our life. We cannot thank Father enough for this invaluable investment into our lives. Thank you for YOU and your ministry!', order: 2 },
  { service: 'Individual Therapy', quote: 'I think The Kohler Group is providing a wonderful service to aid and support the lives of those who need it. God put The Kohler Group in my life at the perfect time to make me aware of how to navigate the stresses and tough decisions that would have to be made in the future.', order: 3 },
  { service: 'Individual Therapy', quote: 'I am thankful God led me to this organization. He knew. He always knows. May God continue to equip and bless you all for the work you do on this mission field.', order: 4 },
  { service: 'Individual Intensive', quote: "I wasn't sure what to expect in the beginning. But it was so much better than what I could have thought. Thank you so much!", order: 5 },
  { service: 'Individual Therapy', quote: 'It was an answer to prayer to find such an understanding and professional Christian therapist.', order: 6 },
  { service: 'Individual Therapy', quote: "April is amazing. I've met with her for over a year now & she has helped me grow in my faith exponentially. She helps me to see the glass half full, she has helped me open my eyes to other perspectives beside my own, and she provides genuine counsel as a woman of God.", order: 7 },
  { service: 'Individual Therapy', quote: 'Thank you for everything, you guys are amazing. I have a very different perspective on therapy as a positive, compared to my earlier perception provided by the culture and beliefs of those I grew up around.', order: 8 },
]

async function run() {
  // --- THERAPISTS ---
  console.log(`\nImporting ${THERAPISTS.length} therapists...`)
  for (let i = 0; i < THERAPISTS.length; i++) {
    const t = THERAPISTS[i]
    console.log(`[${i + 1}/${THERAPISTS.length}] ${t.name}`)
    try {
      let headshotAsset = null
      if (t.headshot.local) {
        headshotAsset = await uploadLocalImage(t.headshot.local, t.headshot.filename)
      } else if (t.headshot.remote) {
        headshotAsset = await uploadRemoteImage(t.headshot.remote, t.headshot.filename)
      }

      await client.create({
        _type: 'therapist',
        name: t.name,
        credentials: t.credentials,
        role: t.role,
        intro: t.intro,
        specializations: t.specializations,
        modalities: t.modalities,
        order: t.order,
        active: true,
        ...(headshotAsset && {
          headshot: { _type: 'image', asset: { _type: 'reference', _ref: headshotAsset._id } }
        }),
      })
      console.log(`  ✓ Done`)
    } catch (err) {
      console.error(`  ✗ Failed — ${err.message}`)
    }
  }

  // --- TESTIMONIALS ---
  console.log(`\nImporting ${TESTIMONIALS.length} testimonials...`)
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    const t = TESTIMONIALS[i]
    try {
      await client.create({
        _type: 'testimonial',
        quote: t.quote,
        clientName: t.service,
        order: t.order,
      })
      console.log(`  ✓ Testimonial ${i + 1}`)
    } catch (err) {
      console.error(`  ✗ Failed — ${err.message}`)
    }
  }

  // --- SITE IMAGES ---
  console.log(`\nUploading site images...`)
  const siteImages = [
    { local: `${PUBLIC_DIR}/images/barbara-kohler-individual.jpg`, filename: 'barbara-kohler-individual.jpg' },
    { local: `${PUBLIC_DIR}/images/barbara-kohler-intensive.jpg`, filename: 'barbara-kohler-intensive.jpg' },
    { local: `${PUBLIC_DIR}/images/therapists-hero.jpg`, filename: 'therapists-hero.jpg' },
    { local: `${PUBLIC_DIR}/images/testimonial-1.jpg`, filename: 'testimonial-1.jpg' },
    { local: `${PUBLIC_DIR}/images/testimonial-2.jpg`, filename: 'testimonial-2.jpg' },
    { local: `${PUBLIC_DIR}/images/testimonial-3.jpg`, filename: 'testimonial-3.jpg' },
    { local: `${PUBLIC_DIR}/images/testimonial-4.jpg`, filename: 'testimonial-4.jpg' },
    { local: `${PUBLIC_DIR}/images/logo.png`, filename: 'kohler-logo.png' },
  ]
  for (const img of siteImages) {
    try {
      const asset = await uploadLocalImage(img.local, img.filename)
      console.log(`  ✓ ${img.filename} → ${asset.url}`)
    } catch (err) {
      console.error(`  ✗ ${img.filename} — ${err.message}`)
    }
  }

  console.log(`\n✅ Kohler import complete.`)
}

run()
