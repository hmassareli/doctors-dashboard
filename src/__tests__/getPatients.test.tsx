import { getPatients } from "../services";

describe("getPatients", () => {
  test("returns patients array", async () => {
    const patients = await getPatients();
    expect(Array.isArray(patients)).toBe(true);
    expect(patients.length).toBeGreaterThan(0);
  });
});
