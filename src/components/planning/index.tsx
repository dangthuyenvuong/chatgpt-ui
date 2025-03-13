import { AnimatedSection } from "./animated-section";
import { ProjectHeader } from "./project-header";
import { ProblemSolutionSection } from "./problem-solution-section";
import { TargetAudienceSection } from "./target-audience-section";
import { BusinessModelSection } from "./business-model-section";
import { MarketResearchSection } from "./market-research-section";
import { UspSection } from "./usp-section";
import { MarketingSection } from "./marketing-section";
import { MvpPlanSection } from "./mvp-plan-section";
import { TechStackSection } from "./tech-stack-section";
import { CostRisksSection } from "./cost-risks-section";
import { ProjectEvaluationSection } from "./project-evaluation-section";

// interface IframeProps {}

// const Iframe: React.FC = () => {
//   const iframeRef = useRef<HTMLIFrameElement>(null);
//   const [iframeLoaded, setIframeLoaded] = useState(false);

//   useEffect(() => {
//     const iframe = iframeRef.current;
//     if (!iframe) return;

//     const onLoad = () => {
//       setIframeLoaded(true);
//     };

//     iframe.addEventListener("load", onLoad);
//     return () => iframe.removeEventListener("load", onLoad);
//   }, []);

//   return (
//     <iframe
//       ref={iframeRef}
//       className="w-full h-96 border"
//       onLoad={() => setIframeLoaded(true)}
//     >
//       {iframeLoaded &&
//         iframeRef.current?.contentWindow?.document?.body &&
//         ReactDOM.createPortal(
//           <MyComponent />,
//           iframeRef.current.contentWindow.document.body
//         )}
//     </iframe>
//   );
// };

export default function Planning() {
  return (
    <div className="min-h-screen bg-pink-50/30 !bg-white py-8 @container" data-theme="light">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="pt-8">
          <AnimatedSection>
            <ProjectHeader />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="grid grid-cols-1 @md:grid-cols-2 gap-8 mt-8 pt-8">
          <AnimatedSection delay={0.1}>
            <ProblemSolutionSection />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <TargetAudienceSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="pt-8">
          <AnimatedSection delay={0.1}>
            <BusinessModelSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="pt-8">
          <AnimatedSection delay={0.1}>
            <MarketResearchSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="pt-8">
          <AnimatedSection delay={0.1}>
            <UspSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="pt-8">
          <AnimatedSection delay={0.1}>
            <MarketingSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="pt-8">
          <AnimatedSection delay={0.1}>
            <MvpPlanSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8">
          <AnimatedSection delay={0.1}>
            <TechStackSection />
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <CostRisksSection />
          </AnimatedSection>
        </div>

        <div className="section-divider"></div>

        <div className="pt-8 pb-16">
          <AnimatedSection delay={0.1}>
            <ProjectEvaluationSection />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
