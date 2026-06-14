const axios = require("axios");

const BACKEND_URL = "http://localhost:5000";

async function runCase(name, payload, expectedSubstring) {
  const res = await axios.post(`${BACKEND_URL}/run`, payload);
  const output = res.data.output || "";
  const passed = output.includes(expectedSubstring);
  console.log(`${passed ? "✅" : "❌"} ${name}`);
  if (!passed) {
    console.log("  Expected output to include:", expectedSubstring);
    console.log("  Got:", JSON.stringify(output));
  }
  return passed;
}

async function testRunLanguages() {
  console.log("Testing: /run language propagation and execution...\n");

  const checks = [];

  checks.push(
    await runCase(
      "C++ execution with stdin",
      {
        language: "cpp",
        input: "42",
        code: `#include <iostream>
using namespace std;
int main() {
    int x;
    cin >> x;
    cout << "Value: " << x * 2 << endl;
    return 0;
}`,
      },
      "Value: 84",
    ),
  );

  checks.push(
    await runCase(
      "Python execution with input()",
      {
        language: "python",
        input: "7",
        code: `val = int(input())
print(f"Value: {val * 3}")`,
      },
      "Value: 21",
    ),
  );

  checks.push(
    await runCase(
      "Python execution with sys.stdin",
      {
        language: "python",
        input: "10",
        code: `import sys
val = int(sys.stdin.read().strip())
print(f"Value: {val * 3}")`,
      },
      "Value: 30",
    ),
  );

  checks.push(
    await runCase(
      "C++ default when language omitted",
      {
        input: "5",
        code: `#include <iostream>
using namespace std;
int main() {
    int x;
    cin >> x;
    cout << "Default: " << x << endl;
    return 0;
}`,
      },
      "Default: 5",
    ),
  );

  const allPassed = checks.every(Boolean);
  console.log(allPassed ? "\n✅ All run language tests PASSED" : "\n❌ Some run language tests FAILED");
  process.exit(allPassed ? 0 : 1);
}

testRunLanguages().catch((err) => {
  console.error("❌ Run language tests failed:", err.message);
  process.exit(1);
});
