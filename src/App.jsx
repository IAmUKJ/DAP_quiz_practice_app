import { useState, useCallback } from "react";

// ─── Question Bank ────────────────────────────────────────────────────────────
const ALL_QUESTIONS = {
  1: {
    title: "Data Analytics Basics",
    questions: [
      { q: "Data analytics is best defined as:", opts: ["Collection of large volumes of data", "Storage of structured and unstructured data", "Scientific process of transforming data into insights for decision-making", "Visualization of data using graphs"], ans: 2 },
      { q: "Which of the following represents the correct order of data analytics types based on workflow?", opts: ["Predictive → Descriptive → Prescriptive → Diagnostic", "Descriptive → Diagnostic → Predictive → Prescriptive", "Diagnostic → Descriptive → Prescriptive → Predictive", "Descriptive → Predictive → Diagnostic → Prescriptive"], ans: 1 },
      { q: 'Under which level of measurement does the variable "height of a person" fall?', opts: ["Nominal", "Ordinal", "Interval", "Ratio"], ans: 3 },
      { q: "In Python (Pandas), which command is used to select rows by integer position?", opts: ["df.loc[]", "df.select()", "df.iloc[]", "df.index[]"], ans: 2 },
      { q: "Which of the following is NOT a benefit of using Jupyter Notebook?", opts: ["Easy documentation", "User-friendly interface", "Faster hardware execution", "Web-based code editing"], ans: 2 },
      { q: "The arithmetic mean is NOT appropriate for which type of data?", opts: ["Interval", "Ratio", "Ordinal", "Nominal"], ans: 3 },
      { q: "If a distribution is positively skewed, which relationship holds true?", opts: ["Mean < Median < Mode", "Mode < Median < Mean", "Mean = Median = Mode", "Median < Mean < Mode"], ans: 1 },
      { q: "Which measure is used to compare relative dispersion between two datasets?", opts: ["Variance", "Standard deviation", "Range", "Coefficient of variation"], ans: 3 },
      { q: "A dataset has a mean of 50 and a standard deviation of 10. According to the Empirical Rule, approximately what percentage of observations lie between 30 and 70?", opts: ["68%", "75%", "95%", "99.7%"], ans: 2 },
      { q: "Consider: x=[10,20,30]; y=x; y.append(40); print(len(x)) — What is the output?", opts: ["3", "4", "Error", "1"], ans: 1 },
    ],
  },
  2: {
    title: "Probability Distributions",
    questions: [
      { q: "Which distribution is most appropriate for rare events occurring over a fixed interval?", opts: ["Binomial", "Normal", "Poisson", "Uniform"], ans: 2 },
      { q: "A fair coin is tossed twice. What is the probability of getting exactly one head?", opts: ["0.25", "0.5", "0.75", "1.0"], ans: 1 },
      { q: "Which distribution is commonly used to model the time between events in a Poisson process?", opts: ["Binomial distribution", "Exponential distribution", "Uniform distribution", "Chi-square distribution"], ans: 1 },
      { q: "Which of the following is a discrete probability distribution?", opts: ["Normal distribution", "Poisson distribution", "Exponential distribution", "Gamma distribution"], ans: 1 },
      { q: "If a binomial distribution has n=10 and p=0.4, what is the mean?", opts: ["2.0", "4.0", "6.0", "10.0"], ans: 1 },
      { q: "In a hypergeometric distribution, sampling is done:", opts: ["Without replacement", "With replacement", "With constant probability", "From infinite population"], ans: 0 },
      { q: "What will be the output of: from scipy.stats import poisson; print(poisson.var(4))?", opts: ["2.0", "4.0", "8.0", "16.0"], ans: 1 },
      { q: "The mean and variance of a Poisson distribution are:", opts: ["μ and μ²", "√λ and λ", "λ and √λ", "λ and λ"], ans: 3 },
      { q: "What will be the output of: from scipy.stats import norm; print(norm.pdf(0))?", opts: ["0.0", "0.25", "0.399", "1.0"], ans: 2 },
      { q: "What will be the output of: import scipy.stats as stats; print(round(stats.norm.cdf(0),2))?", opts: ["0.0", "0.25", "0.5", "1.0"], ans: 2 },
    ],
  },
  3: {
    title: "Sampling & Estimation",
    questions: [
      { q: "Let a population have mean μ=50 and variance σ²=100. For samples of size n=25, the variance of the sampling distribution of the mean is:", opts: ["100.0", "20.0", "4.0", "25.0"], ans: 2 },
      { q: "Which statement about Central Limit Theorem is FALSE?", opts: ["It applies to the sample mean", "It requires normal population", "Approximation improves as n increases", "Sampling distribution tends to normality"], ans: 1 },
      { q: "If P=0.6 and n=150, what is the standard deviation of the sampling distribution of p?", opts: ["0.04", "0.05", "0.06", "0.08"], ans: 0 },
      { q: "A sample of size 36 has mean 80 and population standard deviation 12. The margin of error for a 95% CI is:", opts: ["2.0", "3.92", "4.0", "6.0"], ans: 1 },
      { q: "Which estimator is unbiased?", opts: ["Sample standard deviation", "Sample variance", "Sample range", "Sample median"], ans: 1 },
      { q: "The width of a confidence interval for the population mean will decrease when:", opts: ["Confidence level increases", "Sample size increases", "Population variance increases", "Sample mean increases"], ans: 1 },
      { q: "A 95% CI for a mean is (46.5, 51.5). Which statement is correct?", opts: ["The population mean has a 95% probability of lying in the interval", "95% of sample means lie in this interval", "The CI is constructed so that 95% of such intervals contain μ", "The confidence level equals the sample mean"], ans: 2 },
      { q: "When σ² is unknown and sample size is small, the appropriate distribution for CI estimation of μ is:", opts: ["Z distribution", "Chi-square distribution", "F distribution", "t distribution"], ans: 3 },
      { q: "A variable is normally distributed with mean μ=50 and standard deviation σ=10. What is the Z-score for a value of 65?", opts: ["1.0", "1.5", "2.0", "2.5"], ans: 1 },
      { q: "A sample of size 16 is drawn from a normal population. The chi-square statistic for variance estimation has degrees of freedom equal to:", opts: ["15.0", "16.0", "14.0", "30.0"], ans: 0 },
    ],
  },
  4: {
    title: "Hypothesis Testing I",
    questions: [
      { q: "Given: x̄=32, μ₀=30, σ=10, n=30, α=0.05. Test H₀: μ≤30 vs Hₐ: μ>30. The calculated z-value is closest to:", opts: ["0.87", "1.09", "1.64", "2.05"], ans: 1 },
      { q: "For a one-tailed test at α=0.05, if p-value=0.137, the correct decision is:", opts: ["Reject H₀", "Accept H₀", "Do not reject H₀", "Insufficient data"], ans: 2 },
      { q: "Rejecting a true null hypothesis is called:", opts: ["Type II error", "Power of the test", "Type I error", "Sampling error"], ans: 2 },
      { q: "If the sample size is fixed and α is decreased, then β will:", opts: ["Decrease", "Increase", "Remain unchanged", "Become zero"], ans: 1 },
      { q: "A sample of 120 accidents shows 67 due to drunk driving. Test H₀: p=0.5 vs Hₐ: p≠0.5. The test statistic z is closest to:", opts: ["0.98", "1.15", "1.28", "1.64"], ans: 2 },
      { q: "If in a z test, the p-value=0.2006 and α=0.05, the decision is:", opts: ["Reject H₀", "Not enough evidences", "Do not reject H₀", "Increase sample size"], ans: 2 },
      { q: "If σ₁² and σ₂² are known, the appropriate test statistic for μ₁−μ₂ is:", opts: ["t statistic", "χ² statistic", "z statistic", "F statistic"], ans: 2 },
      { q: "Which hypothesis must always contain equality?", opts: ["Alternative hypothesis", "Research hypothesis", "Null hypothesis", "Working hypothesis"], ans: 2 },
      { q: "Which action reduces both Type I and Type II errors simultaneously?", opts: ["Increasing α", "Decreasing α", "Increasing sample size", "Changing tail of test"], ans: 2 },
      { q: "In the past, 60% of tourists who visited Delhi went to see Agra City. After a promotional campaign, the correct set of hypotheses to test if proportion increased is:", opts: ["H₀: P>0.60 Hₐ: P≤0.60", "H₀: P<0.45 Hₐ: P≥0.45", "H₀: P≥0.45 Hₐ: P<0.45", "H₀: P≤0.60 Hₐ: P>0.60"], ans: 3 },
    ],
  },
  5: {
    title: "Hypothesis Testing II & ANOVA",
    questions: [
      { q: "In testing H₀: μ=20 vs Hₐ: μ>20 with α=0.05, the rejection region for a Z test is:", opts: ["Z<−1.96", "Z>1.645", "|Z|>1.96", "Z<−1.645"], ans: 1 },
      { q: "Given s₁²=16, n₁=10 and s₂²=25, n₂=15. Degrees of freedom (approx.) is closest to:", opts: ["18.0", "20.0", "22.0", "24.0"], ans: 2 },
      { q: "Given n=36, sample mean=34.6, σ=12. H₀: μ≤30, Hₐ: μ>30. At 95% confidence, the null hypothesis should:", opts: ["not be rejected", "be rejected", "Not enough information", "None of these"], ans: 1 },
      { q: "Which test is appropriate? σ unknown, n=45, normal population.", opts: ["Z-test using σ (Population Standard Deviation)", "Z-test using s (Sample Standard Deviation)", "t-test", "F-test"], ans: 1 },
      { q: "ANOVA is preferred over multiple t-tests because it:", opts: ["Reduces Type II error", "Eliminates assumptions", "Controls family-wise Type I error", "Works only for large samples"], ans: 2 },
      { q: "In context of ANOVA, if treatment means are far apart relative to within-group variability, F value will be:", opts: ["Close to 0", "Close to 1", "Large", "Negative"], ans: 2 },
      { q: "If Tukey's HSD critical difference=3.5, then two means of 18 and 14:", opts: ["Not significantly different", "Significantly different", "Need LSD test", "Require larger sample"], ans: 1 },
      { q: "Partial ANOVA table: SS_treatments=240, SS_error=120, df_error=12, number of treatments=4. Mean Square Due to Treatments is:", opts: ["60.0", "80.0", "120.0", "240.0"], ans: 1 },
      { q: "For the same ANOVA table, the total degrees of freedom is:", opts: ["12.0", "16.0", "15.0", "360.0"], ans: 2 },
      { q: "For the data in the ANOVA table, the calculated F-statistic is:", opts: ["4.0", "6.0", "8.0", "12.0"], ans: 2 },
    ],
  },
  6: {
    title: "Regression I",
    questions: [
      { q: "In a two-way ANOVA, if SSA=180, SSB=120, SSAB=60, then SSE equals:", opts: ["300.0", "360.0", "420.0", "Cannot be determined"], ans: 3 },
      { q: "Which of the following designs is the only design capable of detecting interaction effects?", opts: ["One-way ANOVA", "Randomized block design", "Factorial design", "Paired t-test"], ans: 2 },
      { q: "In Randomized Block Design (RBD), each treatment appears:", opts: ["Once in each block", "Randomly multiple times", "In only one block", "Only in selected blocks"], ans: 0 },
      { q: "In a regression: SSR=200, number of independent variables=5, SSE=60, total observations=16. What is the F-statistic?", opts: ["3.33", "4.25", "5.56", "6.67"], ans: 3 },
      { q: "Least squares method minimizes:", opts: ["Σ|residuals|", "Σ(residuals)", "Σ(residuals²)", "Σ(y²)"], ans: 2 },
      { q: "A general linear model can include transformed predictors (z₁, z₂, …). These represent:", opts: ["Only interaction terms", "Only polynomial terms", "Any function of original predictors", "Dummy variables only"], ans: 2 },
      { q: "In Randomized Block Design (RBD) the purpose of blocking is to:", opts: ["Increase within-group variation", "Remove nuisance variation", "Increase error variance", "Increase Type II error"], ans: 1 },
      { q: "In simple linear regression, the coefficient b (slope) represents:", opts: ["Average value of Y", "Change in Y for a one-unit change in X", "Change in X for a one-unit change in Y", "Total variation in data"], ans: 1 },
      { q: "What is the purpose of: tbl = pd.read_excel('C:/Users/Somi/Documents/regr.xlsx')?", opts: ["To read an Excel dataset into a pandas DataFrame", "To create a new Excel file", "To export regression results to Excel", "To convert a DataFrame into a NumPy array"], ans: 0 },
      { q: "If the 95% confidence interval for β₁ does not include 0, then:", opts: ["Model is incorrect", "Residuals are normal", "Slope is statistically significant", "Intercept is zero"], ans: 2 },
    ],
  },
  7: {
    title: "Regression II",
    questions: [
      { q: "When regression assumptions about the error term are violated, which of the following may occur?", opts: ["Coefficient of determination becomes zero", "Hypothesis testing results become unreliable", "Regression line disappears", "Sample size automatically reduces"], ans: 1 },
      { q: "Residual analysis is primarily used to:", opts: ["Estimate regression coefficients", "Test multicollinearity", "Validate regression model assumptions", "Maximize R²"], ans: 2 },
      { q: "If the variance of residuals increases as the value of the independent variable increases, this indicates:", opts: ["Heteroscedasticity", "Autocorrelation", "Multicollinearity", "Normality"], ans: 0 },
      { q: "A residual plot showing a clear curved pattern suggests:", opts: ["The model fits perfectly", "Constant variance exists", "A linear model may be inappropriate", "Errors are normally distributed"], ans: 2 },
      { q: "Standardized residuals are primarily used to:", opts: ["Detect outliers", "Increase R²", "Reduce bias in coefficients", "Transform dependent variables"], ans: 0 },
      { q: "If residuals exhibit non-constant variance, the immediate consequence is:", opts: ["Biased regression coefficients", "Invalid hypothesis tests and confidence intervals", "Incorrect sign of slope", "Perfect multicollinearity"], ans: 1 },
      { q: "In a multiple linear regression model, multicollinearity primarily affects:", opts: ["The unbiasedness of regression coefficients", "The magnitude of the dependent variable", "The stability and standard errors of coefficient estimates", "The calculation of residuals"], ans: 2 },
      { q: "In multiple regression, the adjusted R² is preferred over R² because it:", opts: ["Always increases when a new variable is added", "Penalizes the inclusion of irrelevant independent variables", "Eliminates multicollinearity", "Guarantees better prediction accuracy"], ans: 1 },
      { q: "In a multiple regression model with k independent variables, the overall F-test is used to test whether:", opts: ["All regression coefficients are individually significant", "At least one independent variable is statistically significant", "The intercept is equal to zero", "Residuals are normally distributed"], ans: 1 },
      { q: "In a regression model with a dummy variable representing gender (Male=1, Female=0), the coefficient represents:", opts: ["The average value of the dependent variable for males", "The difference in mean dependent variable between males and females", "The slope of the continuous independent variable", "The variance of the dependent variable"], ans: 1 },
    ],
  },
  8: {
    title: "Logistic Regression",
    questions: [
      { q: "The key difference between the dependent variable in linear regression and logistic regression is that:", opts: ["Both require binary dependent variables", "Linear regression requires continuous dependent variable while logistic regression requires binary dependent variable", "Logistic regression requires continuous dependent variable", "Both require normally distributed dependent variables"], ans: 1 },
      { q: "Which measure is primarily used to assess model fit in logistic regression instead of sum of squared errors?", opts: ["Adjusted R²", "Mean absolute error", "−2 Log Likelihood", "Mean squared error"], ans: 2 },
      { q: "Which statistical test is used to evaluate the overall significance of the logistic regression model?", opts: ["t test", "F test", "G test", "Z test"], ans: 2 },
      { q: "The coefficients in logistic regression are interpreted primarily using:", opts: ["Standardized beta coefficients", "Correlation coefficients", "Variance inflation factors", "Odds ratios"], ans: 3 },
      { q: "In logistic regression, the odds ratio for an independent variable measures:", opts: ["Change in odds for one-unit increase in predictor", "Change in probability for one-unit increase", "Change in mean response", "Goodness of fit of the model"], ans: 0 },
      { q: "If the odds of an event occurring are 3, the corresponding probability is:", opts: ["0.5", "0.6", "0.75", "0.8"], ans: 2 },
      { q: "The difference between the −2 log likelihood of the base model and the proposed model follows approximately which distribution?", opts: ["Chi-square distribution", "t distribution", "Normal distribution", "F distribution"], ans: 0 },
      { q: "The Wald test statistic used in logistic regression for testing significance of coefficients is:", opts: ["β/SE(β)", "β²/SE(β)", "β/SE(β)²", "βSE(β)"], ans: 0 },
      { q: "In logistic regression, the relationship between predictors and probability is modeled using:", opts: ["Linear probability function", "Exponential function", "Logistic (sigmoid) function", "Quadratic function"], ans: 2 },
      { q: "If the estimated probability of an event is P=0.40, the corresponding odds are:", opts: ["0.4", "0.67", "1.5", "2.5"], ans: 1 },
    ],
  },
  9: {
    title: "Classification Metrics",
    questions: [
      { q: "In a binary classification confusion matrix, which component represents records where the model predicts class '1' but the actual class is '0'?", opts: ["False Positive", "True Positive", "False Negative", "True Negative"], ans: 0 },
      { q: "Which of the following correctly defines classification accuracy?", opts: ["(TP+FP)/Total", "(TP+TN)/Total", "(FP+FN)/Total", "TP/(TP+FN)"], ans: 1 },
      { q: "Which metric measures the proportion of actual positives correctly identified?", opts: ["Precision", "Recall (Sensitivity)", "Specificity", "Accuracy"], ans: 1 },
      { q: "Reducing the cutoff value from 0.50 to 0.30 will generally:", opts: ["Increase false negatives", "Decrease sensitivity", "Increase specificity", "Increase predicted positives"], ans: 3 },
      { q: "In an ROC curve, the x-axis represents:", opts: ["Sensitivity", "Precision", "False Positive Rate", "Accuracy"], ans: 2 },
      { q: "Which value of AUC (Area Under Curve) represents a perfect classifier?", opts: ["0.0", "0.5", "0.75", "1.0"], ans: 3 },
      { q: "Which of the following metrics is most useful when false negatives are very costly (e.g., disease detection)?", opts: ["Accuracy", "Specificity", "Sensitivity", "Misclassification rate"], ans: 2 },
      { q: "The first-order regression model with one predictor variable is represented as (standard nomenclature):", opts: ["y=β₀+β₁x₁+ε", "y=β₀+β₁x₁+β₂x₂+ε", "y=β₀x₁+β₁", "y=β₁x₁²+ε"], ans: 0 },
      { q: "In a second-order regression model with one predictor variable, which additional term is included?", opts: ["x", "x²", "y²", "xy"], ans: 1 },
      { q: "In regression analysis, an interaction term between two variables x₁ and x₂ is represented as:", opts: ["x₁+x₂", "x₁−x₂", "x₁x₂", "x₁/x₂"], ans: 2 },
    ],
  },
  10: {
    title: "Chi-square & Clustering",
    questions: [
      { q: "A researcher wants to test whether region (Categorical) and investment type (Categorical) are related. Which test is most appropriate?", opts: ["Chi-square test of independence", "t-test", "ANOVA", "Z-test"], ans: 0 },
      { q: "Degrees of freedom in a contingency table with 4 rows and 3 columns:", opts: ["6.0", "12.0", "5.0", "7.0"], ans: 0 },
      { q: "A Chi-square test shows significance, but several expected frequencies are below 5. What is the most appropriate action?", opts: ["Ignore the issue", "Combine categories", "Increase significance level", "Use regression"], ans: 1 },
      { q: "In a contingency table, if row and column variables are independent, then:", opts: ["Observed = Expected", "Observed > Expected", "Observed < Expected", "Cannot be compared"], ans: 0 },
      { q: "Which situation violates Chi-square assumptions?", opts: ["Categorical data", "Independent observations", "Expected frequency < 5", "Large sample size"], ans: 2 },
      { q: "Cluster analysis may give misleading results when:", opts: ["Data is standardized", "Variables are correlated", "Variables are on different scales", "Sample size is large"], ans: 2 },
      { q: "Which method is most sensitive to outliers in clustering?", opts: ["Hierarchical clustering", "K-means clustering", "Chi-square test", "Regression"], ans: 1 },
      { q: "A marketer uses clustering to segment customers but finds unstable clusters. The most likely issue is:", opts: ["Too many observations", "Poor variable selection", "High significance level", "Low degrees of freedom"], ans: 1 },
      { q: "Which situation best suits cluster analysis?", opts: ["Predicting sales", "Grouping customers based on behavior", "Testing independence", "Estimating mean"], ans: 1 },
      { q: "Standardization transforms data so that:", opts: ["Mean=0 and deviation=1", "Mean=1", "Variance=0", "Values increase"], ans: 0 },
    ],
  },
  11: {
    title: "Cluster Analysis",
    questions: [
      { q: "In cluster analysis, dissimilarity between two objects is:", opts: ["Always negative", "Always zero", "Non-negative and increases with difference", "Equal to correlation"], ans: 2 },
      { q: "If all values of a variable are missing, what should be done?", opts: ["Replace with mean", "Ignore missing values", "Remove variable", "Normalize"], ans: 2 },
      { q: "Categorical variable dissimilarity is based on:", opts: ["Ratio of mismatches", "Mean difference", "Variance", "Correlation"], ans: 0 },
      { q: "If two objects match perfectly in a categorical variable, dissimilarity is:", opts: ["1.0", "0.0", "−1", "Undefined"], ans: 1 },
      { q: "Why are ordinal variables standardized to [0,1]?", opts: ["Increase variance", "Reduce sample size", "Improve correlation", "Different variable scales need normalization"], ans: 3 },
      { q: "If max=3.08 and min=1.34, normalization denominator is:", opts: ["1.74", "2.08", "3.08", "1.0"], ans: 0 },
      { q: "The objective function in K-means minimizes:", opts: ["Between-cluster distance", "Sum of squared distances within clusters", "Correlation", "Variance between clusters"], ans: 1 },
      { q: "Two objects are described by 4 categorical variables. They match in 3 variables and differ in 1. What is the dissimilarity?", opts: ["0.25", "0.5", "0.75", "1.0"], ans: 0 },
      { q: "Given log-transformed values: Object1=2.65, Object2=1.34, Max=3.08, Min=1.34. Find the normalized dissimilarity between objects 1 and 2:", opts: ["0.5", "0.75", "1.0", "0.25"], ans: 1 },
      { q: "Consider two centroids: C1=(1,1), C2=(5,5). A point P=(2,3). Which cluster will P belong to (Euclidean distance)?", opts: ["Cluster 1", "Cluster 2", "Both equally", "Cannot determine"], ans: 0 },
    ],
  },
  12: {
    title: "Decision Trees",
    questions: [
      { q: "In decision tree algorithm, attribute selection method is used to:", opts: ["Clean data", "Choose best splitting attribute", "Remove outliers", "Normalize features"], ans: 1 },
      { q: "CART follows which approach while building trees?", opts: ["Top-down greedy", "Bottom-up greedy", "Random search", "Backtracking"], ans: 0 },
      { q: "The Gini index is mainly used for:", opts: ["Clustering", "Classification", "Regression only", "Sampling"], ans: 1 },
      { q: "Information gain is biased towards:", opts: ["Attributes with many values", "Attributes with fewer values", "Continuous attributes only", "Binary attributes only"], ans: 0 },
      { q: "Gain ratio is used to:", opts: ["Increase bias", "Normalize dataset", "Reduce dataset size", "Remove bias of information gain"], ans: 3 },
      { q: "Which of the following ensures binary splits in decision trees?", opts: ["Information gain", "Gain ratio", "Gini index", "Entropy"], ans: 2 },
      { q: "In hierarchical clustering, HAC stands for:", opts: ["Hierarchical Analytical Clustering", "Hierarchical Agglomerative Clustering", "Hybrid Agglomerative Clustering", "High Accuracy Clustering"], ans: 1 },
      { q: "The Euclidean distance formula is used to:", opts: ["Measure similarity", "Normalize data", "Measure dissimilarity", "Reduce dimensions"], ans: 2 },
      { q: "LabelEncoder in Python is used for:", opts: ["Scaling data", "Encoding categorical variables", "Feature selection", "Data splitting"], ans: 1 },
      { q: "The function fit_transform() in encoding:", opts: ["Only fits model", "Only transforms data", "Fits and transforms data", "Deletes missing values"], ans: 2 },
    ],
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(weekKey, doShuffle) {
  let pool = [];
  if (weekKey === "all") {
    Object.entries(ALL_QUESTIONS).forEach(([wk, data]) =>
      data.questions.forEach((q) => pool.push({ ...q, week: wk, weekTitle: data.title }))
    );
  } else {
    const data = ALL_QUESTIONS[weekKey];
    pool = data.questions.map((q) => ({ ...q, week: weekKey, weekTitle: data.title }));
  }
  return doShuffle ? shuffle(pool) : pool;
}

// ─── Themes ───────────────────────────────────────────────────────────────────
const DARK = {
  bg: "#0f0f13", surface: "#16151a", border: "#2a2820",
  text: "#e8e4d9", muted: "#b8b0a0", faint: "#6b6456",
  accent: "#c8a84b", accentText: "#0f0f13",
  optDefault: { bg: "#0f0f13", border: "#2a2820", color: "#b8b0a0" },
  optDimmed: { bg: "#0f0f13", border: "#1e1c14", color: "#4a4540" },
  correct: { bg: "#1a2e1a", border: "#4a8c4a", color: "#a8d8a8" },
  wrong: { bg: "#2e1a1a", border: "#8c4a4a", color: "#d8a8a8" },
  weekActive: { bg: "#1e1c14", border: "#c8a84b55" },
  progressTrack: "#2a2820",
};
const LIGHT = {
  bg: "#f5f2eb", surface: "#ffffff", border: "#ddd8cc",
  text: "#1a1814", muted: "#5a5248", faint: "#9a9080",
  accent: "#b8922e", accentText: "#ffffff",
  optDefault: { bg: "#ffffff", border: "#ddd8cc", color: "#3a3530" },
  optDimmed: { bg: "#f5f2eb", border: "#e8e4dc", color: "#c0bab0" },
  correct: { bg: "#eaf5ea", border: "#5aaa5a", color: "#1a5a1a" },
  wrong: { bg: "#f5eaea", border: "#aa5a5a", color: "#5a1a1a" },
  weekActive: { bg: "#fdf8ec", border: "#b8922e55" },
  progressTrack: "#ddd8cc",
};

// ─── Styles ───────────────────────────────────────────────────────────────────
const makeS = (t) => ({
  app: {
    minHeight: "100vh",
    background: t.bg,
    color: t.text,
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  header: {
    background: t.bg,
    borderBottom: `1px solid ${t.border}`,
    padding: "20px 32px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    width: 36, height: 36,
    background: t.accent,
    borderRadius: "6px",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "16px", fontWeight: "bold",
    color: t.accentText, flexShrink: 0,
  },
  headerTitle: { fontSize: "15px", fontWeight: "normal", color: t.text, letterSpacing: "0.04em" },
  headerSub: { fontSize: "12px", color: t.faint, marginTop: "2px", fontFamily: "'Courier New', monospace" },
  themeBtn: {
    marginLeft: "auto",
    width: "36px", height: "36px",
    borderRadius: "8px",
    border: `1px solid ${t.border}`,
    background: t.surface,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "18px",
    transition: "background 0.15s",
    flexShrink: 0,
  },
  main: { maxWidth: "760px", margin: "0 auto", padding: "40px 24px" },
  homeHero: { textAlign: "center", marginBottom: "48px" },
  homeTitle: {
    fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "normal",
    color: t.text, lineHeight: 1.15, marginBottom: "12px", letterSpacing: "-0.01em",
  },
  homeAccent: { color: t.accent },
  homeSub: { fontSize: "15px", color: t.faint, fontFamily: "'Courier New', monospace", marginBottom: "32px" },
  controlsCard: {
    background: t.surface, border: `1px solid ${t.border}`,
    borderRadius: "12px", padding: "28px", marginBottom: "32px",
  },
  label: {
    display: "block", fontSize: "11px", letterSpacing: "0.1em",
    color: t.faint, textTransform: "uppercase",
    fontFamily: "'Courier New', monospace", marginBottom: "8px",
  },
  select: {
    width: "100%", background: t.bg, border: `1px solid ${t.border}`,
    borderRadius: "8px", color: t.text, fontSize: "14px",
    padding: "10px 14px", outline: "none", cursor: "pointer",
    fontFamily: "'Georgia', serif", marginBottom: "20px",
  },
  toggleRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px", cursor: "pointer" },
  toggle: (active) => ({
    width: "40px", height: "22px",
    background: active ? t.accent : t.border,
    borderRadius: "11px", position: "relative",
    transition: "background 0.2s", flexShrink: 0,
    cursor: "pointer", border: "none", outline: "none",
  }),
  toggleKnob: (active) => ({
    position: "absolute", top: "3px",
    left: active ? "21px" : "3px",
    width: "16px", height: "16px",
    background: "#fff", borderRadius: "50%", transition: "left 0.2s",
  }),
  toggleLabel: { fontSize: "14px", color: t.muted, userSelect: "none" },
  startBtn: {
    width: "100%", padding: "14px",
    background: t.accent, border: "none", borderRadius: "8px",
    color: t.accentText, fontSize: "15px", fontWeight: "bold",
    cursor: "pointer", letterSpacing: "0.04em",
    fontFamily: "'Georgia', serif", transition: "opacity 0.15s",
  },
  weekGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "10px" },
  weekCard: (active) => ({
    background: active ? t.weekActive.bg : t.surface,
    border: `1px solid ${active ? t.weekActive.border : t.border}`,
    borderRadius: "8px", padding: "14px", cursor: "pointer",
    transition: "border-color 0.15s, background 0.15s",
  }),
  weekNum: { fontSize: "11px", color: t.faint, fontFamily: "'Courier New', monospace", marginBottom: "4px" },
  weekName: { fontSize: "12px", color: t.muted, lineHeight: 1.4 },
  progressRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" },
  progressMeta: { fontSize: "12px", color: t.faint, fontFamily: "'Courier New', monospace" },
  progressBar: { height: "3px", background: t.progressTrack, borderRadius: "2px", marginBottom: "32px", overflow: "hidden" },
  progressFill: (pct) => ({
    height: "100%", width: `${pct}%`, background: t.accent,
    borderRadius: "2px", transition: "width 0.4s ease",
  }),
  qCard: {
    background: t.surface, border: `1px solid ${t.border}`,
    borderRadius: "12px", padding: "28px", marginBottom: "20px",
  },
  qMeta: { fontSize: "11px", color: t.accent, fontFamily: "'Courier New', monospace", letterSpacing: "0.08em", marginBottom: "14px" },
  qText: { fontSize: "17px", color: t.text, lineHeight: 1.65, marginBottom: "24px" },
  optBtn: (state) => {
    const base = {
      display: "block", width: "100%", textAlign: "left",
      padding: "13px 16px", borderRadius: "8px", fontSize: "14px",
      cursor: state === "default" ? "pointer" : "default",
      transition: "border-color 0.15s, background 0.15s",
      lineHeight: 1.5, fontFamily: "'Georgia', serif",
      marginBottom: "8px", border: "1px solid",
    };
    if (state === "correct") return { ...base, background: t.correct.bg, borderColor: t.correct.border, color: t.correct.color };
    if (state === "wrong") return { ...base, background: t.wrong.bg, borderColor: t.wrong.border, color: t.wrong.color };
    if (state === "dimmed") return { ...base, background: t.optDimmed.bg, borderColor: t.optDimmed.border, color: t.optDimmed.color };
    return { ...base, background: t.optDefault.bg, borderColor: t.optDefault.border, color: t.optDefault.color };
  },
  feedback: (ok) => ({
    padding: "12px 16px", borderRadius: "8px", fontSize: "13px",
    fontFamily: "'Courier New', monospace",
    background: ok ? t.correct.bg : t.wrong.bg,
    color: ok ? t.correct.color : t.wrong.color,
    border: `1px solid ${ok ? t.correct.border : t.wrong.border}`,
    marginTop: "8px",
  }),
  navRow: { display: "flex", gap: "10px", flexWrap: "wrap" },
  navBtn: (primary) => ({
    padding: "10px 20px", borderRadius: "8px", fontSize: "14px",
    cursor: "pointer", fontFamily: "'Georgia', serif",
    border: `1px solid ${primary ? t.accent : t.border}`,
    background: primary ? t.accent : t.surface,
    color: primary ? t.accentText : t.muted,
    transition: "opacity 0.15s",
  }),
  resultWrap: { textAlign: "center", padding: "48px 0" },
  bigScore: { fontSize: "80px", fontWeight: "normal", color: t.accent, lineHeight: 1, marginBottom: "8px" },
  scoreLabel: { fontSize: "14px", color: t.faint, fontFamily: "'Courier New', monospace", marginBottom: "32px" },
  resultMsg: { fontSize: "22px", color: t.text, marginBottom: "40px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "40px" },
  statCard: { background: t.surface, border: `1px solid ${t.border}`, borderRadius: "10px", padding: "20px 12px" },
  statNum: { fontSize: "28px", color: t.text, marginBottom: "4px" },
  statLabel: { fontSize: "11px", color: t.faint, fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "0.08em" },
});

// ─── Components ───────────────────────────────────────────────────────────────
function Toggle({ value, onChange, label, S }) {
  return (
    <div style={S.toggleRow} onClick={() => onChange(!value)}>
      <button style={S.toggle(value)} aria-label="toggle">
        <span style={S.toggleKnob(value)} />
      </button>
      <span style={S.toggleLabel}>{label}</span>
    </div>
  );
}

function HomeScreen({ onStart, S }) {
  const [weekKey, setWeekKey] = useState("all");
  const [doShuffle, setDoShuffle] = useState(false);
  const total = weekKey === "all" ? 120 : 10;

  return (
    <div>
      <div style={S.homeHero}>
        <h1 style={S.homeTitle}>
          NPTEL <span style={S.homeAccent}>Quiz</span>
          <br />
          Practice
        </h1>
        <p style={S.homeSub}>Data Analytics with Python · 12 Weeks · 120 Questions</p>
      </div>

      <div style={S.controlsCard}>
        <label style={S.label}>Select week</label>
        <select style={S.select} value={weekKey} onChange={(e) => setWeekKey(e.target.value)}>
          <option value="all">All weeks — combined (120 questions)</option>
          {Object.entries(ALL_QUESTIONS).map(([k, v]) => (
            <option key={k} value={k}>
              Week {k} — {v.title}
            </option>
          ))}
        </select>

        <Toggle value={doShuffle} onChange={setDoShuffle} label="Shuffle questions" S={S} />

        <button
          style={S.startBtn}
          onClick={() => onStart(buildPool(weekKey, doShuffle))}
          onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Start Quiz · {total} questions
        </button>
      </div>

      <label style={{ ...S.label, marginBottom: "12px" }}>Quick-pick by week</label>
      <div style={S.weekGrid}>
        {Object.entries(ALL_QUESTIONS).map(([k, v]) => (
          <div
            key={k}
            style={S.weekCard(weekKey === k)}
            onClick={() => setWeekKey(k)}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#c8a84b55")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = weekKey === k ? "#c8a84b55" : "#2a2820")}
          >
            <div style={S.weekNum}>WEEK {k}</div>
            <div style={S.weekName}>{v.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizScreen({ questions, onFinish, onHome, S }) {
  const [current, setCurrent] = useState(0);
  const [answered, setAnswered] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(0);

  const q = questions[current];
  const chosen = answered[current];
  const isAnswered = chosen !== null;
  const isLast = current === questions.length - 1;
  const pct = ((current) / questions.length) * 100;

  const choose = useCallback(
    (i) => {
      if (isAnswered) return;
      const newAnswered = [...answered];
      newAnswered[current] = i;
      setAnswered(newAnswered);
      if (i === q.ans) setScore((s) => s + 1);
    },
    [isAnswered, answered, current, q]
  );

  const getOptState = (i) => {
    if (!isAnswered) return "default";
    if (i === q.ans) return "correct";
    if (i === chosen) return "wrong";
    return "dimmed";
  };

  return (
    <div>
      <div style={S.progressRow}>
        <span style={S.progressMeta}>
          {current + 1} / {questions.length}
        </span>
        <span style={S.progressMeta}>
          Score: {score}/{questions.length}
        </span>
      </div>
      <div style={S.progressBar}>
        <div style={S.progressFill(pct)} />
      </div>

      <div style={S.qCard}>
        <div style={S.qMeta}>
          WEEK {q.week} · {q.weekTitle}
        </div>
        <div style={S.qText}>{q.q}</div>
        <div>
          {q.opts.map((opt, i) => (
            <button
              key={i}
              style={S.optBtn(getOptState(i))}
              onClick={() => choose(i)}
              disabled={isAnswered}
            >
              <span style={{ color: "#6b6456", marginRight: "10px", fontFamily: "'Courier New', monospace", fontSize: "12px" }}>
                {["A", "B", "C", "D"][i]}.
              </span>
              {opt}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div style={S.feedback(chosen === q.ans)}>
            {chosen === q.ans ? "✓ Correct!" : `✗ Incorrect. Correct answer: ${q.opts[q.ans]}`}
          </div>
        )}
      </div>

      <div style={S.navRow}>
        <button
          style={S.navBtn(false)}
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ← Previous
        </button>

        {isAnswered && !isLast && (
          <button
            style={S.navBtn(true)}
            onClick={() => setCurrent((c) => c + 1)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Next →
          </button>
        )}

        {isAnswered && isLast && (
          <button
            style={S.navBtn(true)}
            onClick={() => onFinish(score, answered)}
            onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            See Results
          </button>
        )}

        <button
          style={{ ...S.navBtn(false), marginLeft: "auto" }}
          onClick={onHome}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ✕ Exit
        </button>
      </div>
    </div>
  );
}

function ResultScreen({ score, total, questions, answered, onRetry, onHome, S }) {
  const pct = Math.round((score / total) * 100);
  const wrong = total - score;
  const msg =
    pct >= 90 ? "Outstanding!" :
    pct >= 70 ? "Great work!" :
    pct >= 50 ? "Good effort, keep practicing." :
    "More practice needed.";

  return (
    <div style={S.resultWrap}>
      <div style={S.bigScore}>{pct}%</div>
      <div style={S.scoreLabel}>
        {score} correct out of {total} questions
      </div>
      <div style={S.resultMsg}>{msg}</div>

      <div style={S.statsGrid}>
        <div style={S.statCard}>
          <div style={{ ...S.statNum, color: "#a8d8a8" }}>{score}</div>
          <div style={S.statLabel}>Correct</div>
        </div>
        <div style={S.statCard}>
          <div style={{ ...S.statNum, color: "#d8a8a8" }}>{wrong}</div>
          <div style={S.statLabel}>Wrong</div>
        </div>
        <div style={S.statCard}>
          <div style={S.statNum}>{total}</div>
          <div style={S.statLabel}>Total</div>
        </div>
      </div>

      {wrong > 0 && (
        <div style={{ textAlign: "left", marginBottom: "40px" }}>
          <div style={{ ...S.label, marginBottom: "16px" }}>Questions you got wrong</div>
          {questions.map((q, i) => {
            if (answered[i] === q.ans) return null;
            return (
              <div key={i} style={{ ...S.qCard, marginBottom: "12px", padding: "16px 20px" }}>
                <div style={S.qMeta}>
                  WEEK {q.week} · {q.weekTitle}
                </div>
                <div style={{ fontSize: "14px", color: "#b8b0a0", marginBottom: "10px", lineHeight: 1.5 }}>{q.q}</div>
                {answered[i] !== null && (
                  <div style={{ fontSize: "13px", color: "#d8a8a8", fontFamily: "'Courier New', monospace", marginBottom: "4px" }}>
                    Your answer: {q.opts[answered[i]]}
                  </div>
                )}
                <div style={{ fontSize: "13px", color: "#a8d8a8", fontFamily: "'Courier New', monospace" }}>
                  Correct: {q.opts[q.ans]}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
        <button
          style={S.navBtn(true)}
          onClick={onRetry}
          onMouseEnter={(e) => (e.target.style.opacity = "0.88")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          Retry same set
        </button>
        <button
          style={S.navBtn(false)}
          onClick={onHome}
          onMouseEnter={(e) => (e.target.style.opacity = "0.7")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ← Back to home
        </button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("home");
  const [questions, setQuestions] = useState([]);
  const [finalScore, setFinalScore] = useState(0);
  const [finalAnswered, setFinalAnswered] = useState([]);
  const [isDark, setIsDark] = useState(true);

  const S = makeS(isDark ? DARK : LIGHT);

  const handleStart = (pool) => {
    setQuestions(pool);
    setScreen("quiz");
  };

  const handleFinish = (score, answered) => {
    setFinalScore(score);
    setFinalAnswered(answered);
    setScreen("result");
  };

  return (
    <div style={S.app}>
      <header style={S.header}>
        <div style={S.logo}>N</div>
        <div>
          <div style={S.headerTitle}>NPTEL · Data Analytics with Python</div>
          <div style={S.headerSub}>Assignment Quiz Practice · 12 Weeks</div>
        </div>
        <button
          style={S.themeBtn}
          onClick={() => setIsDark((d) => !d)}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? "#2a2820" : "#e8e4d9")}
          onMouseLeave={(e) => (e.currentTarget.style.background = S.themeBtn.background)}
        >
          {isDark ? "☀️" : "🌙"}
        </button>
      </header>

      <main style={S.main}>
        {screen === "home" && <HomeScreen onStart={handleStart} S={S} />}
        {screen === "quiz" && (
          <QuizScreen
            questions={questions}
            onFinish={handleFinish}
            onHome={() => setScreen("home")}
            S={S}
          />
        )}
        {screen === "result" && (
          <ResultScreen
            score={finalScore}
            total={questions.length}
            questions={questions}
            answered={finalAnswered}
            onRetry={() => {
              setFinalScore(0);
              setFinalAnswered([]);
              setScreen("quiz");
            }}
            onHome={() => setScreen("home")}
            S={S}
          />
        )}
      </main>
    </div>
  );
}