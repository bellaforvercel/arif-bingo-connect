
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ContractAgreement = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Contract Agreement</h1>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-orange-400">Arif Bingo Agent Agreement</CardTitle>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-orange-300 mb-2">Terms of Service</h3>
            <p className="text-gray-300 leading-relaxed">
              This agreement establishes the terms and conditions between Arif Bingo and the designated agent 
              for the operation of bingo games within the authorized territory.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-orange-300 mb-2">Responsibilities</h3>
            <ul className="text-gray-300 space-y-2 list-disc pl-6">
              <li>Maintain fair and transparent gaming operations</li>
              <li>Ensure accurate reporting of all game activities</li>
              <li>Provide excellent customer service to players</li>
              <li>Comply with all local gaming regulations</li>
              <li>Maintain confidentiality of platform access credentials</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-orange-300 mb-2">Revenue Sharing</h3>
            <p className="text-gray-300 leading-relaxed">
              Revenue sharing percentages are defined in your agent profile and may be adjusted 
              by Arif Bingo administration based on performance and agreement terms.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-orange-300 mb-2">Support</h3>
            <p className="text-gray-300 leading-relaxed">
              Technical support and assistance are available through the designated Arif Bingo 
              support channels during business hours.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
