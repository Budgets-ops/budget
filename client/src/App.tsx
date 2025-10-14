import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Recipient from "@/pages/Recipient";
import Payment from "@/pages/Payment";
import Success from "@/pages/Success";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/recipient">
        <Recipient />
      </Route>
      <Route path="/payment">
        <Payment />
      </Route>
      <Route path="/success">
        <Success />
      </Route>
      <Route path="/">
        <Home />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
