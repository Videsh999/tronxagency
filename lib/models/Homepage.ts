import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHero {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image?: string;
  video?: string;
}

export interface IStat {
  value?: string;
  label?: string;
  order?: number;
}

export interface IAbout {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
}

export interface IProcessItem {
  number?: string;
  title?: string;
  description?: string;
  order?: number;
}

export interface IWhyChooseUsItem {
  title?: string;
  description?: string;
  icon?: string;
  order?: number;
}

export interface IFpvSection {
  title?: string;
  description?: string;
  video?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface IHomepage extends Document {
  hero?: IHero;
  stats: IStat[];
  about?: IAbout;
  process: IProcessItem[];
  whyChooseUs: IWhyChooseUsItem[];
  fpvSection?: IFpvSection;
  createdAt?: Date;
  updatedAt: Date;
}

const HeroSchema = new Schema<IHero>(
  {
    eyebrow: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String },
    primaryCtaText: { type: String, trim: true },
    primaryCtaLink: { type: String, trim: true },
    secondaryCtaText: { type: String, trim: true },
    secondaryCtaLink: { type: String, trim: true },
    image: { type: String, trim: true },
    video: { type: String, trim: true },
  },
  { _id: false }
);

const StatSchema = new Schema<IStat>(
  {
    value: { type: String, trim: true },
    label: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const AboutSchema = new Schema<IAbout>(
  {
    eyebrow: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String },
    image: { type: String, trim: true },
  },
  { _id: false }
);

const ProcessItemSchema = new Schema<IProcessItem>(
  {
    number: { type: String, trim: true },
    title: { type: String, trim: true },
    description: { type: String },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const WhyChooseUsItemSchema = new Schema<IWhyChooseUsItem>(
  {
    title: { type: String, trim: true },
    description: { type: String },
    icon: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const FpvSectionSchema = new Schema<IFpvSection>(
  {
    title: { type: String, trim: true },
    description: { type: String },
    video: { type: String, trim: true },
    ctaText: { type: String, trim: true },
    ctaLink: { type: String, trim: true },
  },
  { _id: false }
);

const HomepageSchema = new Schema<IHomepage>(
  {
    hero: HeroSchema,
    stats: { type: [StatSchema], default: [] },
    about: AboutSchema,
    process: { type: [ProcessItemSchema], default: [] },
    whyChooseUs: { type: [WhyChooseUsItemSchema], default: [] },
    fpvSection: FpvSectionSchema,
  },
  {
    timestamps: true,
  }
);

const Homepage: Model<IHomepage> =
  mongoose.models.Homepage || mongoose.model<IHomepage>("Homepage", HomepageSchema);

export default Homepage;
