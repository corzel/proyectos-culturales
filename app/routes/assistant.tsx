import { useState } from "react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader() {
  // Aquí iría la conexión con el LLM
  return json({ sections: [
    "Objetivos",
    "Actividades", 
    "Presupuesto",
    "Cronograma",
    "Evaluación"
  ]});
}

export default function AssistantRoute() {
  const { sections } = useLoaderData<typeof loader>();
  const [currentSection, setCurrentSection] = useState(0);
  const [responses, setResponses] = useState({});

  const handleNext = () => {
    setCurrentSection((prev) => Math.min(prev + 1, sections.length - 1));
  };

  const handleBack = () => {
    setCurrentSection((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Asistente de Formulación</h1>
      
      <div className="flex gap-4 mb-6">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => setCurrentSection(index)}
            className={`px-4 py-2 rounded-full ${
              index === currentSection
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {section}
          </button>
        ))}
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">{sections[currentSection]}</h2>
        
        <div className="space-y-4">
          <p className="text-gray-600">
            El asistente te guiará en la formulación de esta sección...
          </p>
          
          <textarea
            className="w-full p-2 border rounded"
            rows={6}
            placeholder="Escribe aquí..."
          />
        </div>
        
        <div className="flex justify-between mt-6">
          <button onClick={handleBack} className="btn btn-outline">
            Anterior
          </button>
          <button onClick={handleNext} className="btn btn-primary">
            {currentSection === sections.length - 1 ? "Finalizar" : "Siguiente"}
          </button>
        </div>
      </div>
    </div>
  );
}
