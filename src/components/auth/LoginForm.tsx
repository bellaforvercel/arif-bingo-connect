
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface LoginFormProps {
  onLogin: (role: 'agent' | 'admin') => void;
}

export const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, any login works
    onLogin('agent');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-800 border-orange-500/20">
        <CardHeader className="text-center">
          <div className="text-4xl font-bold text-orange-400 mb-2">ARIF BINGO</div>
          <CardTitle className="text-2xl text-white">Agent Portal</CardTitle>
          <CardDescription className="text-gray-300">
            Sign in to manage your bingo games
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
