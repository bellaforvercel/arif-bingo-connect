
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Contest = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Contest</h1>
      
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-orange-400">Contest Information</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Active Contests</h3>
          <p className="text-gray-400">
            Contest features and leaderboards will be available in future updates.
            Stay tuned for exciting competition opportunities!
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
