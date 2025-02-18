import { Repo } from "../models/repoModel";

export const getRepoByName = async (repo_name: string) => {
    try {
        const repo = await Repo.findOne({ repo_name }).exec();
        return repo;
    } catch (error) {
        console.error(error);
        throw new Error("Database error while fetching repo");
    }
};
