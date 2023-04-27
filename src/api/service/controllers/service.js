"use strict";

/**
 * service controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::service.service", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query("api::service.service").findOne({
      where: { slug: id },
      populate: { 
        opisanie: true,
        image: true,
       },
    });
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  },
}));
