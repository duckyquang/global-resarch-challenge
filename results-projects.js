'use strict';

window.GRC_PROJECTS = {
  'sebastien-kawada': {
    rank: '2nd Place',
    rankShort: '2',
    tier: 'Grand Award Winner',
    name: 'Sebastien Kawada',
    title: 'Residual Drift Dominates Contradiction in Multi-Turn Constraint Reasoning',
    abstract: 'How do multi-turn reasoning systems fail? The expected answer is logical contradiction, where the maintained state becomes unsatisfiable. This project shows that the dominant failure mode is instead satisfiable drift, where the internal state remains logically consistent while the returned answer silently violates prior commitments. The study builds DRIFT-BENCH, a solver-instrumented benchmark of 816 test problems across logic grid, scheduling, and seating domains, and evaluates 4 inference methods across 4 open-weight models. Every gold trajectory is validated by the Z3 theorem prover to remain satisfiable at each turn. MUS-REPAIR performs strongest in every setting, but the central finding is what remains after repair: residual errors are 98% to 100% satisfiable drift across all settings, while contradiction falls near zero. The results show that reliable multi-turn systems must separately verify both state consistency and whether the final answer respects the maintained state.',
    video: ''
  },
  'salma-raies': {
    rank: '1st Place',
    rankShort: '1',
    tier: 'Grand Award Winner',
    name: 'Salma Raies',
    title: 'Noise-Induced Class-Specific Failure in ECG Arrhythmia Classifiers: A Systematic Audit Across Datasets, Noise Types, and Evaluation Paradigms',
    abstract: 'Wearable ECG devices rely on automated arrhythmia classifiers trained on clean clinical recordings, yet their per-class failure behavior under real-world physiological noise remains poorly characterized. This study audits 3 standard classifiers, Support Vector Machine, Random Forest, and 1D Convolutional Neural Network, under 3 physiological noise types from the MIT-BIH Noise Stress Test Database across 4 signal-to-noise ratios. Experiments include intrapatient and interpatient evaluation, plus zero-shot external validation on SVDB and INCART. The key finding is that supraventricular arrhythmia detection fails completely on external datasets despite high aggregate accuracy, exposing a clinically dangerous blind spot. The study further shows that CNN ventricular F1 collapses from 0.90 in intrapatient testing to 0.07 under INCART muscle artifact, and that a 2-stage quality gate only partially recovers performance. The results demonstrate that aggregate accuracy can conceal class-specific failures with direct implications for wearable cardiac monitoring.',
    video: '/assets/videos/salma-raies.mp4'
  },
  'advay-reshwant-raghav': {
    rank: '3rd Place',
    rankShort: '3',
    tier: 'Grand Award Winner',
    name: 'Advay Joshi, Reshwant Borra, Raghav Madhavan',
    title: 'Honest, Leakage-Controlled Prediction of Cryptic Binding Pockets in PCNA Using a Graph Neural Network',
    abstract: 'PCNA is a ring-shaped protein essential for DNA replication and repair, making it an important but difficult cancer drug target because its functional surfaces are mostly flat protein-protein interfaces. This project investigates whether a leakage-controlled graph neural network can identify cryptic pocket candidates in PCNA while avoiding inflated evaluation from evolutionary overlap between training and test proteins. The study uses a frozen 30% sequence-identity split, holds PCNA out entirely, evaluates with macro-AUPRC instead of inflated AUROC, and performs a 1-shot sealed test on 214 structures. The 3-layer GraphSAGE model more than doubles the random baseline, recovers the known AOH1996 front-face binding region as a positive control, and flags 15 novel candidate windows. The strongest 3 candidates were tested with exploratory 25 ns molecular dynamics simulations and remained closed, a clean negative result reported transparently. The main contribution is an honest, reproducible predict-then-test pipeline with explicit leakage control rather than an inflated performance claim.',
    video: '/assets/videos/advay-joshi-reshwant-borra-raghav-madhavan.mp4'
  },
  'jayden-lin': {
    rank: 'Top 10 - 4th',
    rankShort: '4',
    tier: 'Top 10 Project',
    name: 'Jayden Lin',
    title: 'Connectome Hub Vulnerability and the Limits of Network Spread in Parkinson\'s Disease',
    abstract: 'This project investigates whether Parkinson\'s cortical degeneration is shaped by the brain\'s structural connectome, and whether degeneration spreads along network connections. Using ENIGMA Parkinson\'s cortical-thickness maps across Hoehn and Yahr stages 1 to 5, a group-average structural connectome, gene-expression data, and spatial spin-test nulls, the study finds that cortical thinning concentrates on connectome hubs, especially in early disease. However, connectivity-weighted neighbor atrophy, subcortical source projection, early-to-late spread, and Parkinson\'s risk-gene expression do not explain cortical thinning. The paper concludes that the connectome predicts where Parkinson\'s cortical degeneration begins, but not how it spreads.',
    video: '/assets/videos/jayden-lin.mov'
  },
  'haruka-nagata': {
    rank: 'Top 10 - 5th',
    rankShort: '5',
    tier: 'Top 10 Project',
    name: 'Haruka Nagata',
    title: 'Provider Type and Oral Rehydration Therapy Receipt in Tanzania\'s Childhood Diarrhea Policy: Evidence from the 2020-21 National Panel Survey',
    abstract: 'This study examines whether children under 5 in Tanzania who seek diarrhea care actually receive oral rehydration therapy. Using the 2020-21 Tanzania National Panel Survey, the paper models the pathway from reported diarrhea to care-seeking to ORT receipt among 278 children. Among children who sought care, those taken to pharmacies received ORT at 51.6%, compared with 71.4% for public primary care. Adjusted models show pharmacy care is associated with lower odds of ORT receipt and higher odds of seeking care but receiving no ORT. The study argues that Tanzania should track access and treatment receipt together, especially in pharmacy and retail medicine channels already used by caregivers.',
    video: '/assets/videos/haruka-nagata.mov'
  },
  'vaibhav-shakya': {
    rank: 'Top 10 - 6th',
    rankShort: '6',
    tier: 'Top 10 Project',
    name: 'Vaibhav Shakya',
    title: 'Leray\'s Coboundary at Altitude: A Cellular-Sheaf Compiler Framework for Software-Defined Radiation Hardness on Deep-Space Flight Computers',
    abstract: 'This project proposes a compiler-driven radiation-hardness framework based on cellular sheaf theory as an alternative to triple modular redundancy in deep-space flight computers. The framework builds a cellular sheaf on a program\'s control-flow graph and synthesizes restriction maps across 6 computational frontends, using a shared decoder to detect faults. The paper proves 2 formal theorems, including an altitude bound and a separation result against binary LDPC codes, then tests the system across 258,645 fault trials. Results show 100% detection on 5 algebraic frontends, 83.2% on the statistical frontend, graceful multi-fault degradation, and projected 63% energy savings compared with always-on TMR in a Europa Clipper mission profile.',
    video: '/assets/videos/vaibhav-shakya.mp4'
  },
  'stan-daria': {
    rank: 'Top 10 - 7th',
    rankShort: '7',
    tier: 'Top 10 Project',
    name: 'Stan Daria',
    title: 'Triton: Eye Above the Sea: Real-Time Drowning Detection Using AI-Based Marine Monitoring and Human Behavioral Analysis',
    abstract: 'Triton is a real-time, edge-deployed drowning detection platform built on a Raspberry Pi 4B. The system integrates YOLOv11 object detection, YOLOv11 segmentation for marine hazard mapping, YOLOv11 Pose estimation, and an XGBoost temporal classifier trained on a self-collected dataset of about 2,500 annotated frames. The behavioral classifier uses normalized 17-keypoint skeletal features over 4-second sliding windows to distinguish drowning risk from normal swimming. Evaluated with grouped k-fold validation at the video level, the classifier achieved 0.90 accuracy, 0.912 precision, 0.961 recall, 0.886 AUC, and 0.941 average precision. The project frames AI as a lifeguard-support system, keeping human operators in control of all alerts.',
    video: '/assets/videos/stan-daria-triton.mp4'
  },
  'nubaid-khan': {
    rank: 'Top 10 - 8th',
    rankShort: '8',
    tier: 'Top 10 Project',
    name: 'Nubaid Khan',
    title: 'MAKOTO: A Crisis-Conditioned Reinforcement Learning Framework Demonstrates That Uncertainty-Aware Reward Design Is Necessary, Not Optional, for Global Macroeconomic Policy Optimization',
    abstract: 'MAKOTO introduces a crisis-conditioned reinforcement learning framework for global macroeconomic policy optimization. Using a 30-country, 24-year World Bank panel from 2000 to 2023, the system combines an LSTM forecasting ensemble, an IsolationForest crisis detector trained only on a 2004 to 2007 reference period, and a PPO policy agent whose reward is amplified by a continuous uncertainty score. MAKOTO achieved a 7.1% reward advantage over an unconditioned baseline, with a bootstrap 95% confidence interval excluding 0, and remained robust across 3 random seeds. A key ablation showed that removing the uncertainty signal caused MAKOTO to fall below the baseline, suggesting the crisis signal is structurally important rather than merely additive.',
    video: '/assets/videos/nubaid-khan-makoto.mp4'
  },
  'jaden-pedro': {
    rank: 'Top 10 - 9th',
    rankShort: '9',
    tier: 'Top 10 Project',
    name: 'Jaden Pedro',
    title: 'Weather-Driven Short-Term Load Forecasting in the New York Metropolitan Area Using Machine Learning',
    abstract: 'This project develops machine learning models for hourly electricity load forecasting across 4 NYISO zones in the New York metropolitan area. The study isolates weather-driven demand using a structural baseline decomposition, then trains Gradient Boosting and Random Forest regressors on a 35-feature set including weather observations, temporal encodings, lag features, rolling statistics, and weather-calendar interactions. Gradient Boosting outperformed Random Forest in every zone, achieving R2 values from 0.852 to 0.926 and reducing persistence-baseline MAE by 53% to 68%. In Zone J, forecast error dropped from 275 MW to 88 MW. SHAP and permutation analysis identified 24-hour rolling load and 24-hour rolling temperature as key predictors, while a CodeCarbon audit found very low training emissions.',
    video: '/assets/videos/jaden-pedro-surge.mp4'
  },
  'kailee-wong': {
    rank: 'Top 10 - 10th',
    rankShort: '10',
    tier: 'Top 10 Project',
    name: 'Kailee Wong',
    title: 'Breadfruit as a Fraction-Specific Biotechnology Platform for Pacific Island Sustainability',
    abstract: 'This project synthesizes 5 years of breadfruit-centered research investigating Artocarpus altilis as a local biotechnology platform for Pacific Island sustainability. The work covers 4 application branches: thermoplastic starch bioplastics from breadfruit waste, biodegradable hydrogels for soil-water retention, bioethanol from breadfruit starch hydrolysate, and non-dairy probiotic systems using pulp, skin, and seed. The strongest quantitative outcomes came from fermentation-based branches, including 7.00% bioethanol from 100 g/L pulp hydrolysate after 48 hr and 3.0 x 10^7 CFU retention in the 7% pulp probiotic after gastric simulation. The paper argues that breadfruit should be understood as a modular, fraction-specific bioresource that can address local challenges in materials, agriculture, energy, and functional food systems.',
    video: ''
  }
};
