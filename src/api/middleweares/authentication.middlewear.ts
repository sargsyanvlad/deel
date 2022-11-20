import { models } from "../../db";
import { Request, Response, NextFunction } from "express";
import { GenericObject } from "../../types";
class AuthenticationMiddleware {
  async getProfile(
    req: Request & { profile: GenericObject },
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const profile = await models.Profiles.findOne({
        where: { id: req.get("profile_id") || 0 },
      });
      if (!profile) {
        res.status(401).end();
        return;
      }
      req.profile = profile;
      next();
    } catch (e) {
      next(e);
    }
  }

  async isAdmin(req, res, next) {
    if (req.payload?.user && req.payload.user.isAdmin) {
      return next();
    }
    res.status(409).send("Unauthorized");
  }
}

export default new AuthenticationMiddleware();
