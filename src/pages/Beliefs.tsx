import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import whatweBelieve from "../assets/lexi-laginess-zfvr_8hDngc-unsplash.jpeg";
import baptism from "../assets/CFMC-Baptism.jpg";

const articles = [
  {
    title: "We Believe in the One True God",
    body: "We believe there is one living and true God, eternal in being, infinite in power, wisdom, goodness, and love. God is the Creator and Sustainer of all things, visible and invisible, and is worthy of our worship, trust, and complete devotion.",
    scripture: {
      text: "The LORD our God, the LORD is one.",
      ref: "Deuteronomy 6:4",
    },
  },
  {
    title: "We Believe in the Trinity",
    body: "We believe God exists eternally as three persons: Father, Son, and Holy Spirit. These three are one in substance, power, and eternity. The mystery of the Trinity reveals the fullness of God's nature and the depth of God's love.",
  },
  {
    title: "We Believe in God the Father",
    body: "We believe God the Father is Lord of heaven and earth. God is self-existing, infinite, all-knowing, all-powerful, and present everywhere. Through Jesus Christ, the Father is made known to us as holy, loving, just, and merciful.",
  },
  {
    title: "We Believe in Jesus Christ, God the Son",
    body: "We believe Jesus Christ is the eternal Son of God, fully God and fully human. Conceived by the Holy Spirit and born of the Virgin Mary, Jesus came to save us from our sins. He suffered, was crucified, died, and was buried. Through His sacrifice, we are reconciled to God.\n\nJesus is the image of the invisible God, the Savior of the world, and the only way to the Father.",
    scripture: {
      text: "I am the way and the truth and the life. No one comes to the Father except through me.",
      ref: "John 14:6",
    },
  },
  {
    title: "We Believe in God the Holy Spirit",
    body: "We believe the Holy Spirit is fully God: present, powerful, and active in the world and in the lives of believers. The Spirit guides us into truth, convicts us of sin, comforts us, strengthens us, and empowers us to live faithfully as followers of Jesus Christ.",
  },
  {
    title: "We Believe in the Resurrection",
    body: "We believe Jesus Christ truly rose from the dead. His resurrection is the foundation of our hope and the promise of eternal life. After His resurrection, Jesus appeared to many witnesses, ascended into heaven, and now sits at the right hand of God the Father. We believe He will come again to judge the living and the dead.",
    scripture: {
      text: "He is not here; he has risen, just as he said.",
      ref: "Matthew 28:6",
    },
  },
  {
    title: "We Believe in the Holy Scriptures",
    body: "We believe the Holy Scriptures are the Word of God and contain all things necessary for salvation. The Bible reveals the heart and will of God, teaches us truth, corrects us, forms us in righteousness, and equips us for faithful living.\n\nThe canonical books of the Old and New Testaments are received as the authoritative witness of God's revelation and the foundation for Christian faith and practice.",
    scripture: {
      text: "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.",
      ref: "2 Timothy 3:16",
    },
  },
  {
    title: "We Believe in the Church",
    body: 'We believe in the holy catholic ("universal") Church — the fellowship of all who confess Jesus Christ as Lord and Savior. The visible Church is the gathered community of believers where the Word of God is faithfully preached and the Sacraments are rightly administered. All are invited into the fellowship of Christ\'s Church.',
  },
  {
    title: "We Believe in the Communion of Saints",
    body: "We believe we are surrounded by a great cloud of witnesses: faithful men and women who have gone before us in the faith. Their lives encourage us to persevere, worship faithfully, and follow Jesus with courage and hope.",
  },
  {
    title: "We Believe in Sin and Our Need for Grace",
    body: "We believe all people have sinned and fallen short of the glory of God. Sin separates us from God and reflects the brokenness of human nature. Apart from God's grace, we are unable to restore ourselves to righteousness.\n\nYet God does not leave us in our sin. Through Jesus Christ, God offers forgiveness, reconciliation, and new life.",
  },
  {
    title: "We Believe in Free Will and God's Grace",
    body: "We believe human beings are created in the image of God, but that image has been marred by sin. By our own strength, we cannot do works pleasing and acceptable to God. But through the grace of Jesus Christ and the work of the Holy Spirit, our wills are awakened, restored, and empowered to respond to God.\n\nWe are responsible to receive God's grace and to choose lives of obedience, faith, and love.",
  },
  {
    title: "We Believe in Reconciliation Through Christ",
    body: "We believe Jesus Christ died for our sins and, through His sacrifice, reconciles us to God. He is the Lamb of God who takes away the sin of the world. Through Him, we are forgiven, made new, and presented before God holy and blameless.",
  },
  {
    title: "We Believe Salvation Is by Grace Through Faith",
    body: "We believe salvation is the gift of God, received by grace through faith in Jesus Christ. We do not earn salvation by our works. Rather, good works are the fruit of salvation and a witness to the transforming power of Christ in us.",
    scripture: {
      text: "For it is by grace you have been saved, through faith… not by works, so that no one can boast.",
      ref: "Ephesians 2:8–9",
    },
  },
  {
    title: "We Believe in Forgiveness",
    body: "We believe God is faithful and just to forgive our sins when we confess them. Because we have been forgiven by God, we are called to forgive others freely and sincerely.",
  },
  {
    title: "We Believe in Baptism",
    body: "We believe Baptism is a sign of God's grace, new birth, and belonging to the family of faith. In Baptism, we are marked as Christ's own and called to die to sin and rise to new life in Him. In keeping with the Methodist tradition, we affirm the Baptism of children as a sign of God's covenant grace.",
  },
  {
    title: "We Believe in Holy Communion",
    body: "We believe Holy Communion is a means of grace in which believers remember the sacrifice of Jesus Christ and receive spiritual nourishment from God. At the Lord's Table, we remember Christ's body broken and blood poured out for the forgiveness of sins.",
  },
  {
    title: "We Believe in Prayer",
    body: "We believe prayer is communion with God. Through prayer, we adore God, confess our sins, give thanks, seek His help, submit to His will, and intercede for others. Prayer may be public or private, spoken or silent, but it always draws us deeper into a relationship with God.",
  },
  {
    title: "We Believe in the Great Commission",
    body: "We believe Jesus calls His followers to make disciples of all nations. The Church is sent into the world to proclaim the good news, baptize in the name of the Father, Son, and Holy Spirit, teach obedience to Christ, and embody justice, mercy, and faithfulness.",
    scripture: {
      text: "Go and make disciples of all nations…",
      ref: "Matthew 28:19",
    },
  },
  {
    title: "We Believe in the Life Everlasting",
    body: "We believe in the promise of eternal life through Jesus Christ. We look forward with hope to the New Heaven and New Earth, where God will dwell with His people, every tear will be wiped away, and death, mourning, crying, and pain will be no more.",
    scripture: {
      text: "He who believes has everlasting life.",
      ref: "John 6:47",
    },
  },
];

const graceTypes = [
  {
    name: "Prevenient Grace",
    description:
      "The grace that comes before our awareness of God, awakening us and drawing us toward Him.",
  },
  {
    name: "Justifying Grace",
    description:
      "The grace by which God forgives our sins and makes us right with Him through faith in Jesus Christ.",
  },
  {
    name: "Sanctifying Grace",
    description:
      "The grace by which God continues to renew us, shaping us into the likeness of Christ.",
  },
];

export default function Beliefs() {
  return (
    <div className="bg-church-warm">
      {/* Header */}
      <section
        className="pt-40 pb-20 px-6 text-white text-center relative"
        style={{
          backgroundImage: `url(${whatweBelieve})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/75" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif mb-8">
            What We Believe
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-church-dark/70 leading-relaxed font-serif">
            As a church in the Methodist tradition, Carrollton First Methodist
            Church stands within the historic Christian faith. These Articles of
            Faith express the core beliefs that shape our worship, teaching,
            discipleship, and mission.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="pb-24 px-6">
        <div className="max-w-3xl mx-auto space-y-0">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="py-14 border-b border-black/10 last:border-b-0"
            >
              <h2 className="text-2xl md:text-3xl font-serif text-church-blue mb-5">
                {article.title}
              </h2>
              {article.body.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="text-lg text-church-dark/70 leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
              {article.scripture && (
                <blockquote className="mt-6 pl-5 border-l-4 border-church-accent">
                  <p className="text-lg font-serif text-church-blue italic leading-relaxed">
                    "{article.scripture.text}"
                  </p>
                  <cite className="mt-2 block text-sm font-medium text-church-accent not-italic tracking-wide">
                    — {article.scripture.ref}
                  </cite>
                </blockquote>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grace of God — Special Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-serif text-church-blue mb-6">
              We Believe in the Grace of God
            </h2>
            <p className="text-lg text-church-dark/70 leading-relaxed max-w-2xl mx-auto">
              As Methodists, we rejoice in the grace of God that reaches us
              before we ever reach for Him, saves us through faith, and
              continues to transform us throughout our lives. We understand
              God's grace in several important ways:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {graceTypes.map((grace, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 bg-church-warm rounded-2xl border border-black/5"
              >
                <div className="w-10 h-1 bg-church-accent mb-6 rounded-full" />
                <h3 className="text-xl font-serif text-church-blue mb-3">
                  {grace.name}
                </h3>
                <p className="text-church-dark/70 leading-relaxed">
                  {grace.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 text-white px-6 relative"
        style={{
          backgroundImage: `url(${baptism})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-church-blue/80" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="handwritten text-church-accent mb-4 block">
            Come As You Are
          </span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6">
            These Beliefs Are an Invitation
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-10">
            Whether you're exploring faith for the first time or looking for a
            church home rooted in historic Christianity, we'd love to welcome
            you. Come worship with us and discover what it means to belong to
            this community of faith.
          </p>
          <Link
            to="/join"
            className="btn-outline inline-flex items-center gap-2"
          >
            Plan Your Visit <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
