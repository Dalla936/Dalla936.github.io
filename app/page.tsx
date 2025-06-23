import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin, Github, ExternalLink, Download } from "lucide-react"
import Image from "next/image"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              JD
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">John Doe</h1>
              <p className="text-xl text-gray-600 mb-4">Étudiant BUT Informatique - Développeur Web</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  john.doe@email.com
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4 mr-2" />
                  06 12 34 56 78
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Télécharger CV
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* À propos */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">À propos de moi</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                Étudiant en 2ème année de BUT Informatique, passionné par le développement web et les nouvelles
                technologies. Au cours de ma formation, j'ai acquis des compétences solides en programmation,
                développement web, et gestion de projet. Je recherche actuellement un stage pour approfondir mes
                connaissances et contribuer à des projets innovants.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Compétences */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Compétences techniques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Langages de programmation</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Java</Badge>
                    <Badge variant="secondary">Python</Badge>
                    <Badge variant="secondary">JavaScript</Badge>
                    <Badge variant="secondary">HTML/CSS</Badge>
                    <Badge variant="secondary">SQL</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Frameworks & Outils</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="secondary">Node.js</Badge>
                    <Badge variant="secondary">Git</Badge>
                    <Badge variant="secondary">Docker</Badge>
                    <Badge variant="secondary">MySQL</Badge>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Méthodologies</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Agile</Badge>
                    <Badge variant="secondary">Scrum</Badge>
                    <Badge variant="secondary">UML</Badge>
                    <Badge variant="secondary">Tests unitaires</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Projets BUT 1 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Projets BUT 1</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SAE 1.01 - Implémentation d'un besoin client</CardTitle>
                <CardDescription>Développement d'une application de gestion</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Développement d'une application Java pour la gestion d'un système de réservation. Utilisation des
                  concepts de POO et implémentation d'une interface utilisateur intuitive.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Java</Badge>
                  <Badge>Swing</Badge>
                  <Badge>UML</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir le projet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SAE 1.02 - Comparaison d'approches algorithmiques</CardTitle>
                <CardDescription>Analyse et optimisation d'algorithmes</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Étude comparative de différents algorithmes de tri et de recherche. Analyse de la complexité
                  temporelle et spatiale avec implémentation en Python.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Python</Badge>
                  <Badge>Algorithmes</Badge>
                  <Badge>Analyse de complexité</Badge>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Voir le projet
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SAE Importantes BUT 2 */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Projets majeurs BUT 2</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>SAE 2.01 - Développement d'une application</CardTitle>
                <CardDescription>Projet d'envergure en équipe</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Capture d'écran du projet SAE 2.01"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  Développement d'une application web complète de gestion de bibliothèque universitaire. Travail en
                  équipe de 4 personnes avec méthodologie Agile. Implémentation d'un système de réservation, gestion des
                  utilisateurs et interface d'administration.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>MySQL</Badge>
                  <Badge>Express</Badge>
                  <Badge>Agile</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo live
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    Code source
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>SAE 2.02 - Exploration algorithmique</CardTitle>
                <CardDescription>Recherche et innovation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Visualisation algorithme SAE 2.02"
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
                <p className="text-gray-700 mb-4">
                  Recherche et implémentation d'algorithmes d'intelligence artificielle pour la résolution de problèmes
                  d'optimisation. Développement d'une interface de visualisation pour comprendre le comportement des
                  algorithmes génétiques.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>Python</Badge>
                  <Badge>IA</Badge>
                  <Badge>Algorithmes génétiques</Badge>
                  <Badge>Matplotlib</Badge>
                  <Badge>NumPy</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Voir la démo
                  </Button>
                  <Button variant="outline" size="sm">
                    <Github className="w-4 h-4 mr-2" />
                    Code source
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Expérience Stage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Expérience professionnelle</h2>
          <Card>
            <CardHeader>
              <CardTitle>Stage de développement - TechCorp Solutions</CardTitle>
              <CardDescription>Avril 2024 - Juin 2024 (10 semaines)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Missions réalisées</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Développement d'un module de reporting pour l'ERP de l'entreprise</li>
                    <li>Optimisation des requêtes SQL existantes (amélioration de 40% des performances)</li>
                    <li>Création d'une API REST pour l'intégration avec des services tiers</li>
                    <li>Participation aux réunions d'équipe et aux revues de code</li>
                    <li>Rédaction de documentation technique</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Compétences développées</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge>PHP</Badge>
                    <Badge>Laravel</Badge>
                    <Badge>PostgreSQL</Badge>
                    <Badge>API REST</Badge>
                    <Badge>Git</Badge>
                    <Badge>Travail en équipe</Badge>
                  </div>
                  <p className="text-gray-700">
                    Cette expérience m'a permis de découvrir le monde professionnel du développement et d'appliquer mes
                    connaissances théoriques sur des projets concrets.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Formation */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Formation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">BUT Informatique</h3>
                  <p className="text-gray-600">IUT de [Votre ville] • 2022 - 2025</p>
                  <p className="text-gray-700">Spécialisation en développement d'applications</p>
                </div>
                <div>
                  <h3 className="font-semibold">Baccalauréat Scientifique</h3>
                  <p className="text-gray-600">Lycée [Nom du lycée] • 2022</p>
                  <p className="text-gray-700">Mention Bien - Spécialité Mathématiques et NSI</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Me contacter</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                N'hésitez pas à me contacter pour discuter d'opportunités de stage, d'alternance ou de collaboration.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button>
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un email
                </Button>
                <Button variant="outline">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2024 John Doe. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  )
}
