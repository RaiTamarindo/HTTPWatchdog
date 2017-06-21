'use strict';

module.exports = function(req, res, next)
{
    var isPOSTNotPUT = req.method == 'POST' ? true : (req.method == 'PUT' ? false : undefined);

    if(isPOSTNotPUT !== undefined)
    {
        req
            .checkBody(
            {
                'url':
                {
                    notEmpty: isPOSTNotPUT,
                    isUrl:
                    {
                        errorMessage: 'Enter a valid website URL.'
                    },
                    errorMessage: 'Website URL is mandatory.'
                },
                'successfulResponsesSLO':
                {
                    notEmpty: isPOSTNotPUT,
                    isNumber:
                    {
                        errorMessage: 'Enter a valid percent successful responses.'
                    },
                    errorMessage: 'Percent successful responses is mandatory.'
                },
                'fastResponsesSLO':
                {
                    notEmpty: isPOSTNotPUT,
                    isNumber:
                    {
                        errorMessage: 'Enter a valid percent fast responses.'
                    },
                    errorMessage: 'Percent fast responses is mandatory.'
                }
            });

        req.getValidationResult()
            .then(function(result)
            {
                if (!result.isEmpty())
                {
                    var err = result.array()[0];

                    res.status(400)
                        .send(
                        {
                            message: err.msg
                        });
                    return;
                }
                else 
                {
                    next();
                }
            });
    }
    else
    {
        next();
    }
};